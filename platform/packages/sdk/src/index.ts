/*
 * Copyright (C) 2025 OpenMonetize
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import ky from 'ky';
import { PersistentQueue, QueueItem } from './queue/persistent-queue';
import { v4 as uuidv4 } from 'uuid';

export interface OpenMonetizeConfig {
  apiKey: string;
  endpoint?: string;
  maxRetries?: number;
  flushIntervalMs?: number;
}

export interface UsageEvent {
  customer_id: string;
  event_type: string;
  feature_id: string;
  [key: string]: any;
}

export class OpenMonetize {
  private apiKey: string;
  private endpoint: string;
  private queue: PersistentQueue<UsageEvent>;
  private flushInterval: NodeJS.Timeout | null = null;
  private isFlushing: boolean = false;

  constructor(config: OpenMonetizeConfig) {
    this.apiKey = config.apiKey;
    this.endpoint = config.endpoint || 'https://api.openmonetize.com';
    this.queue = new PersistentQueue();
    
    // Start background flush
    const interval = config.flushIntervalMs || 5000;
    if (typeof window !== 'undefined' || typeof global !== 'undefined') {
       this.flushInterval = setInterval(() => this.flush(), interval);
    }
  }

  async track(event: Omit<UsageEvent, 'event_id' | 'timestamp'>): Promise<void> {
    const fullEvent = {
      ...event,
      event_id: uuidv4(),
      timestamp: new Date().toISOString(),
      idempotency_key: uuidv4() // Ensure idempotency at source
    };

    await this.queue.enqueue(fullEvent as unknown as UsageEvent);
    
    // Try to flush immediately if online
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      this.flush().catch(console.error);
    }
  }

  async flush(): Promise<void> {
    if (this.isFlushing) return;
    this.isFlushing = true;

    try {
      const items = await this.queue.peek(50);
      if (items.length === 0) return;

      const events = items.map(item => item.data);

      await ky.post(`${this.endpoint}/v1/events/ingest`, {
        json: { events },
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json'
        },
        retry: {
          limit: 3,
          methods: ['post'],
          statusCodes: [408, 413, 429, 500, 502, 503, 504]
        },
        timeout: 10000
      });

      // If successful, remove from queue
      await this.queue.remove(items.map(i => i.id));
      
    } catch (error) {
      console.error('OpenMonetize: Failed to flush events', error);
      // Leave in queue for next retry
    } finally {
      this.isFlushing = false;
    }
  }

  stop(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
  }
}
