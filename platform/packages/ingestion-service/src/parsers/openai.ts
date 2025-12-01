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

import { ProviderParser, TokenUsage } from './index';

export class OpenAIParser implements ProviderParser {
  canHandle(provider: string): boolean {
    return provider.toUpperCase() === 'OPENAI';
  }

  parse(response: any): TokenUsage {
    const usage = response?.usage || {};
    
    const inputTokens = usage.prompt_tokens || 0;
    const outputTokens = usage.completion_tokens || 0;
    const totalTokens = usage.total_tokens || (inputTokens + outputTokens);

    return {
      inputTokens,
      outputTokens,
      totalTokens,
      metadata: {
        model: response?.model,
        system_fingerprint: response?.system_fingerprint
      }
    };
  }
}
