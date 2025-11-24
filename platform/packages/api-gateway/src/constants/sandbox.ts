/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { randomUUID } from 'crypto';

export interface MockTextResponseOptions {
  completionId: string;
  created: number;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface MockImageResponseOptions {
  completionId: string;
  created: number;
  model: string;
  count: number;
}

export interface MockTextEventOptions {
  customerId: string;
  provider: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  completionId: string;
}

export interface MockImageEventOptions {
  customerId: string;
  provider: string;
  model: string;
  size: string;
  quality: string;
  count: number;
  completionId: string;
}

export const getMockTextResponse = ({
  completionId,
  created,
  model,
  promptTokens,
  completionTokens,
  totalTokens,
}: MockTextResponseOptions) => {
  return {
    id: completionId,
    object: 'chat.completion',
    created: created,
    model: model,
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content:
            'Quantum computing harnesses the principles of quantum mechanics to process information. Unlike classical computers that use bits (0 or 1), quantum computers use qubits, which can exist in a state of superposition (both 0 and 1 simultaneously). This allows them to solve certain complex problems exponentially faster than traditional supercomputers.',
        },
        finish_reason: 'stop',
      },
    ],
    usage: {
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
    },
  };
};

export const getMockImageResponse = ({
  completionId,
  created,
  model,
  count,
}: MockImageResponseOptions) => {
  return {
    id: completionId,
    object: 'image.generation',
    created: created,
    model: model,
    choices: Array(count)
      .fill(0)
      .map((_, i) => ({
        index: i,
        url: 'https://placehold.co/1024x1024/png?text=Cyberpunk+City',
      })),
    usage: {
      image_count: count,
    },
  };
};

export const getMockTextEvent = ({
  customerId,
  provider,
  model,
  promptTokens,
  completionTokens,
  completionId,
}: MockTextEventOptions) => {
  return {
    event_id: randomUUID(),
    customer_id: customerId,
    event_type: 'TOKEN_USAGE',
    feature_id: 'ai-text-generation',
    provider: provider.toUpperCase(),
    model: model,
    input_tokens: promptTokens,
    output_tokens: completionTokens,
    timestamp: new Date().toISOString(),
    idempotency_key: completionId,
  };
};

export const getMockImageEvent = ({
  customerId,
  provider,
  model,
  size,
  quality,
  count,
  completionId,
}: MockImageEventOptions) => {
  return {
    event_id: randomUUID(),
    customer_id: customerId,
    event_type: 'IMAGE_GENERATION',
    feature_id: 'image-generation',
    provider: provider.toUpperCase(),
    model: model,
    image_size: size,
    quality: quality,
    image_count: count,
    timestamp: new Date().toISOString(),
    idempotency_key: completionId,
  };
};
