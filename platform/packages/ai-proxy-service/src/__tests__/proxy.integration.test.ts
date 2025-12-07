/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { chatCompletionsRoute } from "../routes/openai/chat-completions";
import { messagesRoute } from "../routes/anthropic/messages";

// Mock the usage tracker to avoid actual HTTP calls
vi.mock("../services/usage-tracker", () => ({
  trackUsage: vi.fn().mockResolvedValue(undefined),
}));

// Mock fetch for upstream calls
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("AI Proxy Integration Tests", () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    vi.clearAllMocks();

    app = Fastify();
    await app.register(cors, { origin: true });
    await app.register(chatCompletionsRoute);
    await app.register(messagesRoute);
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("OpenAI /v1/chat/completions", () => {
    const validHeaders = {
      Authorization: "Bearer sk-test-openai-key",
      "Content-Type": "application/json",
      "X-OM-Customer-Id": "test-customer",
      "X-OM-User-Id": "test-user",
      "X-OM-Feature-Id": "test-feature",
      "X-OM-Api-Key": "om_test_key",
    };

    it("should return 400 when billing headers are missing", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/v1/chat/completions",
        headers: {
          Authorization: "Bearer sk-test",
          "Content-Type": "application/json",
        },
        payload: {
          model: "gpt-4",
          messages: [{ role: "user", content: "Hello" }],
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.error.code).toBe("missing_billing_headers");
    });

    it("should return 401 when OpenAI API key is missing", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          "X-OM-Customer-Id": "test-customer",
          "X-OM-User-Id": "test-user",
          "X-OM-Feature-Id": "test-feature",
          "X-OM-Api-Key": "om_test_key",
        },
        payload: {
          model: "gpt-4",
          messages: [{ role: "user", content: "Hello" }],
        },
      });

      expect(response.statusCode).toBe(401);
      const body = JSON.parse(response.body);
      expect(body.error.code).toBe("missing_api_key");
    });

    it("should proxy request to OpenAI and return response", async () => {
      const mockOpenAIResponse = {
        id: "chatcmpl-123",
        object: "chat.completion",
        created: 1677652288,
        model: "gpt-4",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: "Hello! How can I help you?",
            },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 15,
          total_tokens: 25,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockOpenAIResponse,
      } as Response);

      const response = await app.inject({
        method: "POST",
        url: "/v1/chat/completions",
        headers: validHeaders,
        payload: {
          model: "gpt-4",
          messages: [{ role: "user", content: "Hello" }],
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.id).toBe("chatcmpl-123");
      expect(body.usage.prompt_tokens).toBe(10);
      expect(body.usage.completion_tokens).toBe(15);
    });

    it("should track usage after successful request", async () => {
      const { trackUsage } = await import("../services/usage-tracker.js");

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          id: "chatcmpl-123",
          model: "gpt-4",
          choices: [{ message: { content: "Hi" }, finish_reason: "stop" }],
          usage: { prompt_tokens: 5, completion_tokens: 3, total_tokens: 8 },
        }),
      } as Response);

      await app.inject({
        method: "POST",
        url: "/v1/chat/completions",
        headers: validHeaders,
        payload: {
          model: "gpt-4",
          messages: [{ role: "user", content: "Hi" }],
        },
      });

      // Wait for async tracking
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(trackUsage).toHaveBeenCalledWith(
        expect.objectContaining({
          customerId: "test-customer",
          userId: "test-user",
          featureId: "test-feature",
        }),
        "OPENAI",
        "gpt-4",
        5,
        3,
      );
    });
  });

  describe("Anthropic /v1/messages", () => {
    const validHeaders = {
      "x-api-key": "sk-ant-test-key",
      "Content-Type": "application/json",
      "X-OM-Customer-Id": "test-customer",
      "X-OM-User-Id": "test-user",
      "X-OM-Feature-Id": "test-feature",
      "X-OM-Api-Key": "om_test_key",
    };

    it("should return 400 when billing headers are missing", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/v1/messages",
        headers: {
          "x-api-key": "sk-ant-test",
          "Content-Type": "application/json",
        },
        payload: {
          model: "claude-3-sonnet-20240229",
          max_tokens: 1024,
          messages: [{ role: "user", content: "Hello" }],
        },
      });

      expect(response.statusCode).toBe(400);
    });

    it("should return 401 when Anthropic API key is missing", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/v1/messages",
        headers: {
          "Content-Type": "application/json",
          "X-OM-Customer-Id": "test-customer",
          "X-OM-User-Id": "test-user",
          "X-OM-Feature-Id": "test-feature",
          "X-OM-Api-Key": "om_test_key",
        },
        payload: {
          model: "claude-3-sonnet-20240229",
          max_tokens: 1024,
          messages: [{ role: "user", content: "Hello" }],
        },
      });

      expect(response.statusCode).toBe(401);
    });

    it("should proxy request to Anthropic and return response", async () => {
      const mockAnthropicResponse = {
        id: "msg_123",
        type: "message",
        role: "assistant",
        content: [{ type: "text", text: "Hello! How can I help you?" }],
        model: "claude-3-sonnet-20240229",
        stop_reason: "end_turn",
        stop_sequence: null,
        usage: {
          input_tokens: 10,
          output_tokens: 15,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockAnthropicResponse,
      } as Response);

      const response = await app.inject({
        method: "POST",
        url: "/v1/messages",
        headers: validHeaders,
        payload: {
          model: "claude-3-sonnet-20240229",
          max_tokens: 1024,
          messages: [{ role: "user", content: "Hello" }],
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.id).toBe("msg_123");
      expect(body.usage.input_tokens).toBe(10);
      expect(body.usage.output_tokens).toBe(15);
    });
  });

  describe("Error Handling", () => {
    it("should return 504 on upstream timeout", async () => {
      mockFetch.mockRejectedValueOnce(
        Object.assign(new Error("Timeout"), { name: "TimeoutError" }),
      );

      const response = await app.inject({
        method: "POST",
        url: "/v1/chat/completions",
        headers: {
          Authorization: "Bearer sk-test",
          "Content-Type": "application/json",
          "X-OM-Customer-Id": "test-customer",
          "X-OM-User-Id": "test-user",
          "X-OM-Feature-Id": "test-feature",
          "X-OM-Api-Key": "om_test_key",
        },
        payload: {
          model: "gpt-4",
          messages: [{ role: "user", content: "Hello" }],
        },
      });

      expect(response.statusCode).toBe(504);
    });

    it("should pass through upstream error responses", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        text: async () =>
          JSON.stringify({
            error: { message: "Rate limit exceeded", type: "rate_limit_error" },
          }),
      } as Response);

      const response = await app.inject({
        method: "POST",
        url: "/v1/chat/completions",
        headers: {
          Authorization: "Bearer sk-test",
          "Content-Type": "application/json",
          "X-OM-Customer-Id": "test-customer",
          "X-OM-User-Id": "test-user",
          "X-OM-Feature-Id": "test-feature",
          "X-OM-Api-Key": "om_test_key",
        },
        payload: {
          model: "gpt-4",
          messages: [{ role: "user", content: "Hello" }],
        },
      });

      expect(response.statusCode).toBe(429);
    });
  });
});
