'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Code } from 'lucide-react';
import { useSandboxAuth } from '@/hooks/useSandboxAuth';
import { useSandboxLogs } from '@/hooks/useSandboxLogs';
import { useSandboxBalance } from '@/hooks/useSandboxBalance';
import { Header } from '@/components/sandbox/Header';
import { ApiConsoleCard } from '@/components/sandbox/ApiConsoleCard';
import { LiveLogsPanel } from '@/components/sandbox/LiveLogsPanel';
import { IntegrationCodePanel } from '@/components/sandbox/IntegrationCodePanel';
import { AuthPage } from '@/components/sandbox/AuthPage';
import { VisualDataFlow } from '@/components/sandbox/VisualDataFlow';
import { API_URL, CODE_SNIPPETS } from './constants';
import type { GenerationType } from './types';

export default function SandboxPage() {
  const [activeTab, setActiveTab] = useState('llm');
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  // Custom hooks
  const { logs, addLog, clearLogs, logEndRef } = useSandboxLogs();
  const { apiKey, customerName, authChecked, handleLogout, handleLoginSuccess } = useSandboxAuth(addLog);
  const { balance, fetchBalance, handleTopUp } = useSandboxBalance(apiKey, addLog);

  // Simulation helper
  const simulateFlow = async (step: string, duration: number) => {
    setActiveStep(step);
    await new Promise(r => setTimeout(r, duration));
  };

  // Main generation handler
  const handleGeneration = async (type: GenerationType, requestData?: any) => {
    if (!apiKey) return;
    setLoading(true);
    
    try {
      // 1. APP: User initiates action
      await simulateFlow('app', 500);
      addLog('APP', `User requested ${type === 'text' ? 'GPT-4' : 'DALL-E 3'} generation...`);

      // 2. GATEWAY: Request hits API
      await simulateFlow('gateway', 400);
      addLog('API', `POST /v1/apiconsole/generate`, { type });

      // 3. INGESTION: Backend calls ingestion (Simulated visualization)
      await simulateFlow('ingestion', 400);
      
      // Actual API Call to BFF
      const res = await fetch(`${API_URL}/v1/apiconsole/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          type,
          prompt: requestData?.userPrompt || (type === 'text' ? 'Explain quantum computing' : 'Cyberpunk city'),
          model: requestData?.model || (type === 'text' ? 'o1-preview' : 'dall-e-3'),
          // Image specific
          size: '1024x1024',
          quality: 'hd',
          count: 1
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setActiveStep(null);
        if (res.status === 402 || res.status === 429) {
          addLog('API', '❌ Request Blocked: Quota Exceeded', data);
        } else {
          addLog('API', `❌ Error: ${data.message || res.statusText}`);
        }
      } else {
        // 4. RATING: Event processed
        await simulateFlow('rating', 600);
        addLog('RATING', 'Calculated cost based on Pricing Table', { 
          model: data.model,
          cost: data.usage?.estimated_cost_usd 
            ? `$${Number(data.usage.estimated_cost_usd).toFixed(4)} USD` 
            : (type === 'text' ? '~0.15 USD' : '0.04 USD')
        });

        // 5. DB: Balance updated
        await simulateFlow('db', 500);
        addLog('BILLING', 'Deducted credits from wallet');
        
        // Finalize
        setActiveStep(null);
        addLog('APP', 'Response received successfully');
        
        // Refresh balance
        fetchBalance();
      }

    } catch (error) {
      console.error(error);
      addLog('API', 'Network Error');
      setActiveStep(null);
    }
    
    setLoading(false);
  };

  // Show auth page if not authenticated
  if (!authChecked) return null;
  if (!apiKey) return <AuthPage onSuccess={handleLoginSuccess} />;

  // Main playground UI
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Header Section (Compact) */}
      <div className="px-4 md:px-8">
        <Header
            customerName={customerName}
            apiKey={apiKey}
            balance={balance}
            onLogout={handleLogout}
            onTopUp={handleTopUp}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 md:px-8 pb-12">
        
        {/* LEFT COLUMN: API Console (Input) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <ApiConsoleCard
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeStep={activeStep}
            loading={loading}
            onGenerate={handleGeneration}
          />
        </div>

        {/* RIGHT COLUMN: Output (Flow + Logs) */}
        <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Visual Flow (Moved here) */}
            <VisualDataFlow activeStep={activeStep} />
          
            {/* TABS: Logs vs Code */}
            <Tabs defaultValue="logs" className="flex-1 flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-2">
                <TabsList className="dark:bg-slate-800">
                    <TabsTrigger value="logs" className="gap-2 dark:data-[state=active]:bg-slate-700 dark:text-slate-400 dark:data-[state=active]:text-white"><Activity className="h-3 w-3" /> Live Logs</TabsTrigger>
                    <TabsTrigger value="code" className="gap-2 dark:data-[state=active]:bg-slate-700 dark:text-slate-400 dark:data-[state=active]:text-white"><Code className="h-3 w-3" /> Integration Code</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        System Online
                    </div>
                </div>
                </div>

                <TabsContent value="logs" className="flex-1 h-full mt-0">
                    <LiveLogsPanel logs={logs} onClearLogs={clearLogs} logEndRef={logEndRef} />
                </TabsContent>

                <TabsContent value="code" className="flex-1 h-full mt-0">
                    <IntegrationCodePanel activeTab={activeTab} snippets={CODE_SNIPPETS} />
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}
