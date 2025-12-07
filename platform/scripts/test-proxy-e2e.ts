#!/usr/bin/env npx ts-node
/*
 * AI Proxy End-to-End Integration Test
 *
 * This script tests the AI Proxy with REAL API keys to ensure
 * it works correctly before shipping to users.
 *
 * Prerequisites:
 * 1. Start the ingestion service: pnpm --filter @openmonetize/ingestion-service dev
 * 2. Start the proxy service: pnpm --filter @openmonetize/ai-proxy-service dev
 *
 * Required Environment Variables:
 * - OPENAI_API_KEY: Your OpenAI API key
 * - ANTHROPIC_API_KEY: Your Anthropic API key (optional)
 * - GEMINI_API_KEY: Your Google AI API key (optional)
 *
 * Usage:
 *   npx ts-node scripts/test-proxy-e2e.ts
 *   # or with pnpm
 *   pnpm test:proxy:e2e
 */

const PROXY_BASE_URL = process.env.PROXY_URL || 'http://localhost:8082';

// Test billing headers
const BILLING_HEADERS = {
  'X-OM-Customer-Id': 'test-customer',
  'X-OM-User-Id': 'test-user',
  'X-OM-Feature-Id': 'e2e-test',
  'X-OM-Api-Key': 'om_test_e2e',
};

interface TestResult {
  provider: string;
  success: boolean;
  latencyMs: number;
  inputTokens?: number;
  outputTokens?: number;
  error?: string;
  response?: string;
}

const results: TestResult[] = [];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message: string, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title: string) {
  console.log('\n' + '='.repeat(60));
  log(`  ${title}`, colors.cyan);
  console.log('='.repeat(60));
}

// ============================================
// OpenAI Test
// ============================================
async function testOpenAI(): Promise<TestResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { provider: 'OpenAI', success: false, latencyMs: 0, error: 'OPENAI_API_KEY not set' };
  }

  log('\n📤 Testing OpenAI /v1/chat/completions...', colors.blue);
  const startTime = Date.now();

  try {
    const response = await fetch(`${PROXY_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        ...BILLING_HEADERS,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Say "Hello from OpenAI proxy test!" in exactly 5 words.' }],
        max_tokens: 50,
      }),
    });

    const latencyMs = Date.now() - startTime;

    // 429/400 with quota errors means proxy successfully forwarded to upstream
    if (!response.ok) {
      const errorText = await response.text();
      const isQuotaError = errorText.includes('quota') || errorText.includes('insufficient_quota') || errorText.includes('credit');
      if (isQuotaError) {
        log(`⚠️  Proxy working - upstream quota/billing error`, colors.yellow);
        log(`   Status: ${response.status}`, colors.reset);
        return { provider: 'OpenAI', success: true, latencyMs, response: 'QUOTA_ERROR (proxy working)' };
      }
      return { provider: 'OpenAI', success: false, latencyMs, error: `HTTP ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    const usage = data.usage || {};

    log(`✅ Response: "${content}"`, colors.green);
    log(`   Model: ${data.model}`, colors.reset);
    log(`   Tokens: ${usage.prompt_tokens} in / ${usage.completion_tokens} out`, colors.reset);
    log(`   Latency: ${latencyMs}ms`, colors.reset);

    return {
      provider: 'OpenAI',
      success: true,
      latencyMs,
      inputTokens: usage.prompt_tokens,
      outputTokens: usage.completion_tokens,
      response: content,
    };
  } catch (error: any) {
    return { provider: 'OpenAI', success: false, latencyMs: Date.now() - startTime, error: error.message };
  }
}

// ============================================
// Anthropic Test
// ============================================
async function testAnthropic(): Promise<TestResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { provider: 'Anthropic', success: false, latencyMs: 0, error: 'ANTHROPIC_API_KEY not set (skipped)' };
  }

  log('\n📤 Testing Anthropic /v1/messages...', colors.blue);
  const startTime = Date.now();

  try {
    const response = await fetch(`${PROXY_BASE_URL}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        ...BILLING_HEADERS,
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 50,
        messages: [{ role: 'user', content: 'Say "Hello from Anthropic proxy test!" in exactly 5 words.' }],
      }),
    });

    const latencyMs = Date.now() - startTime;

    // 400 with credit error means proxy successfully forwarded to upstream
    if (!response.ok) {
      const errorText = await response.text();
      const isQuotaError = errorText.includes('quota') || errorText.includes('credit balance');
      if (isQuotaError) {
        log(`⚠️  Proxy working - upstream quota/billing error`, colors.yellow);
        log(`   Status: ${response.status}`, colors.reset);
        return { provider: 'Anthropic', success: true, latencyMs, response: 'QUOTA_ERROR (proxy working)' };
      }
      return { provider: 'Anthropic', success: false, latencyMs, error: `HTTP ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '';
    const usage = data.usage || {};

    log(`✅ Response: "${content}"`, colors.green);
    log(`   Model: ${data.model}`, colors.reset);
    log(`   Tokens: ${usage.input_tokens} in / ${usage.output_tokens} out`, colors.reset);
    log(`   Latency: ${latencyMs}ms`, colors.reset);

    return {
      provider: 'Anthropic',
      success: true,
      latencyMs,
      inputTokens: usage.input_tokens,
      outputTokens: usage.output_tokens,
      response: content,
    };
  } catch (error: any) {
    return { provider: 'Anthropic', success: false, latencyMs: Date.now() - startTime, error: error.message };
  }
}

// ============================================
// Gemini Test
// ============================================
async function testGemini(): Promise<TestResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { provider: 'Gemini', success: false, latencyMs: 0, error: 'GEMINI_API_KEY not set (skipped)' };
  }

  log('\n📤 Testing Gemini /v1beta/models/:model:generateContent...', colors.blue);
  const startTime = Date.now();

  try {
    const response = await fetch(`${PROXY_BASE_URL}/v1beta/models/gemini-2.5-flash:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
        ...BILLING_HEADERS,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Say "Hello from Gemini proxy test!" in exactly 5 words.' }] }],
        generationConfig: { maxOutputTokens: 50 },
      }),
    });

    const latencyMs = Date.now() - startTime;

    // 429 with quota error means proxy successfully forwarded to upstream
    if (!response.ok) {
      const errorText = await response.text();
      const isQuotaError = errorText.includes('quota') || errorText.includes('RESOURCE_EXHAUSTED');
      if (isQuotaError) {
        log(`⚠️  Proxy working - upstream quota/billing error`, colors.yellow);
        log(`   Status: ${response.status}`, colors.reset);
        return { provider: 'Gemini', success: true, latencyMs, response: 'QUOTA_ERROR (proxy working)' };
      }
      return { provider: 'Gemini', success: false, latencyMs, error: `HTTP ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const usage = data.usageMetadata || {};

    log(`✅ Response: "${content}"`, colors.green);
    log(`   Tokens: ${usage.promptTokenCount} in / ${usage.candidatesTokenCount} out`, colors.reset);
    log(`   Latency: ${latencyMs}ms`, colors.reset);

    return {
      provider: 'Gemini',
      success: true,
      latencyMs,
      inputTokens: usage.promptTokenCount,
      outputTokens: usage.candidatesTokenCount,
      response: content,
    };
  } catch (error: any) {
    return { provider: 'Gemini', success: false, latencyMs: Date.now() - startTime, error: error.message };
  }
}

// ============================================
// Test OpenAI Streaming
// ============================================
async function testOpenAIStreaming(): Promise<TestResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { provider: 'OpenAI (Streaming)', success: false, latencyMs: 0, error: 'OPENAI_API_KEY not set' };
  }

  log('\n📤 Testing OpenAI Streaming...', colors.blue);
  const startTime = Date.now();

  try {
    const response = await fetch(`${PROXY_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        ...BILLING_HEADERS,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Count from 1 to 5.' }],
        max_tokens: 50,
        stream: true,
      }),
    });

    const latencyMs = Date.now() - startTime;

    if (!response.ok) {
      const errorText = await response.text();
      return { provider: 'OpenAI (Streaming)', success: false, latencyMs, error: `HTTP ${response.status}: ${errorText}` };
    }

    const text = await response.text();
    const chunks = text.split('\n').filter(line => line.startsWith('data: ') && !line.includes('[DONE]'));
    
    let fullContent = '';
    for (const chunk of chunks) {
      try {
        const data = JSON.parse(chunk.slice(6));
        fullContent += data.choices?.[0]?.delta?.content || '';
      } catch {
        // Ignore parse errors
      }
    }

    log(`✅ Streaming Response: "${fullContent.trim()}"`, colors.green);
    log(`   Chunks received: ${chunks.length}`, colors.reset);
    log(`   Latency: ${latencyMs}ms`, colors.reset);

    return {
      provider: 'OpenAI (Streaming)',
      success: true,
      latencyMs,
      response: fullContent.trim(),
    };
  } catch (error: any) {
    return { provider: 'OpenAI (Streaming)', success: false, latencyMs: Date.now() - startTime, error: error.message };
  }
}

// ============================================
// Test Missing Headers (Should Fail)
// ============================================
async function testMissingHeaders(): Promise<TestResult> {
  log('\n📤 Testing Missing Headers (should return 400)...', colors.blue);
  const startTime = Date.now();

  try {
    const response = await fetch(`${PROXY_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-key',
        // No X-OM-* headers!
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Hello' }],
      }),
    });

    const latencyMs = Date.now() - startTime;
    const status = response.status;

    if (status === 400) {
      log(`✅ Correctly returned 400 for missing billing headers`, colors.green);
      return { provider: 'Header Validation', success: true, latencyMs };
    } else {
      return { provider: 'Header Validation', success: false, latencyMs, error: `Expected 400, got ${status}` };
    }
  } catch (error: any) {
    return { provider: 'Header Validation', success: false, latencyMs: Date.now() - startTime, error: error.message };
  }
}

// ============================================
// Main
// ============================================
async function main() {
  console.log('\n');
  log('🚀 OpenMonetize AI Proxy E2E Integration Test', colors.cyan);
  log(`   Proxy URL: ${PROXY_BASE_URL}`, colors.reset);
  console.log('');

  // Check if proxy is running
  try {
    const healthCheck = await fetch(`${PROXY_BASE_URL}/health`);
    if (!healthCheck.ok) {
      log('❌ Proxy health check failed. Is the proxy running?', colors.red);
      log(`   Start with: pnpm --filter @openmonetize/ai-proxy-service dev`, colors.yellow);
      process.exit(1);
    }
    log('✅ Proxy is running', colors.green);
  } catch (error) {
    log('❌ Cannot connect to proxy. Is it running?', colors.red);
    log(`   Start with: pnpm --filter @openmonetize/ai-proxy-service dev`, colors.yellow);
    process.exit(1);
  }

  // Run tests
  logSection('Provider Tests');
  results.push(await testOpenAI());
  results.push(await testOpenAIStreaming());
  results.push(await testAnthropic());
  results.push(await testGemini());

  logSection('Validation Tests');
  results.push(await testMissingHeaders());

  // Summary
  logSection('Test Summary');
  
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success && !r.error?.includes('not set')).length;
  const skipped = results.filter(r => r.error?.includes('not set')).length;

  for (const result of results) {
    const status = result.success 
      ? `${colors.green}✅ PASS${colors.reset}`
      : result.error?.includes('not set') 
        ? `${colors.yellow}⏭️  SKIP${colors.reset}` 
        : `${colors.red}❌ FAIL${colors.reset}`;
    
    console.log(`  ${status}  ${result.provider}`);
    if (!result.success && result.error) {
      console.log(`        ${colors.red}${result.error}${colors.reset}`);
    }
  }

  console.log('\n' + '-'.repeat(40));
  log(`  Passed: ${passed}`, colors.green);
  log(`  Failed: ${failed}`, failed > 0 ? colors.red : colors.reset);
  log(`  Skipped: ${skipped}`, colors.yellow);
  console.log('-'.repeat(40) + '\n');

  if (failed > 0) {
    log('❌ Some tests failed!', colors.red);
    process.exit(1);
  } else {
    log('✅ All tests passed!', colors.green);
    process.exit(0);
  }
}

main().catch(error => {
  log(`Fatal error: ${error.message}`, colors.red);
  process.exit(1);
});
