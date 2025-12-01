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

import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

export interface QueueItem<T> {
  id: string;
  data: T;
  timestamp: number;
  retryCount: number;
}

export class PersistentQueue<T> {
  private store: LocalForage;
  private isProcessing: boolean = false;
  private queueName: string;

  constructor(name: string = 'om_events_queue') {
    this.queueName = name;
    this.store = localforage.createInstance({
      name: 'OpenMonetize',
      storeName: name
    });
  }

  async enqueue(data: T): Promise<string> {
    const id = uuidv4();
    const item: QueueItem<T> = {
      id,
      data,
      timestamp: Date.now(),
      retryCount: 0
    };

    // Use timestamp + id as key to maintain order roughly
    // Or just use UUID and sort by timestamp on retrieval
    await this.store.setItem(id, item);
    return id;
  }

  async peek(limit: number = 10): Promise<QueueItem<T>[]> {
    const items: QueueItem<T>[] = [];
    
    await this.store.iterate((value: QueueItem<T>, key, iterationNumber) => {
      items.push(value);
      if (items.length >= limit) {
        return items; // Stop iteration
      }
    });

    // Sort by timestamp to ensure FIFO
    return items.sort((a, b) => a.timestamp - b.timestamp);
  }

  async remove(ids: string[]): Promise<void> {
    const promises = ids.map(id => this.store.removeItem(id));
    await Promise.all(promises);
  }

  async count(): Promise<number> {
    return this.store.length();
  }

  async clear(): Promise<void> {
    await this.store.clear();
  }
}
