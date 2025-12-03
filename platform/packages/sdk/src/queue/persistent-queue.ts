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

import { v4 as uuidv4 } from 'uuid';

export interface QueueItem<T> {
  id: string;
  data: T;
  timestamp: number;
  retryCount: number;
}

interface StorageDriver {
  setItem<T>(key: string, value: T): Promise<T>;
  iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U): Promise<U>;
  removeItem(key: string): Promise<void>;
  length(): Promise<number>;
  clear(): Promise<void>;
}

class InMemoryStorage implements StorageDriver {
  private storage = new Map<string, any>();

  async setItem<T>(key: string, value: T): Promise<T> {
    this.storage.set(key, value);
    return value;
  }

  async iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U): Promise<U> {
    let i = 0;
    for (const [key, value] of this.storage) {
      const result = iteratee(value, key, i++);
      if (result !== undefined) return result;
    }
    return undefined as unknown as U;
  }

  async removeItem(key: string): Promise<void> {
    this.storage.delete(key);
  }

  async length(): Promise<number> {
    return this.storage.size;
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }
}

class BrowserStorage implements StorageDriver {
  private prefix: string;

  constructor(name: string) {
    this.prefix = `${name}/`;
  }

  private getKey(key: string): string {
    return this.prefix + key;
  }

  async setItem<T>(key: string, value: T): Promise<T> {
    try {
      window.localStorage.setItem(this.getKey(key), JSON.stringify(value));
      return value;
    } catch (e) {
      console.warn('[OpenMonetize] Failed to save to localStorage:', e);
      return value;
    }
  }

  async iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U): Promise<U> {
    let iterationNumber = 0;
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        const valueStr = window.localStorage.getItem(key);
        if (valueStr) {
          try {
            const value = JSON.parse(valueStr);
            // Remove prefix for the callback
            const originalKey = key.slice(this.prefix.length);
            const result = iteratee(value, originalKey, iterationNumber++);
            if (result !== undefined) return result;
          } catch (e) {
            // Ignore corrupted items
          }
        }
      }
    }
    return undefined as unknown as U;
  }

  async removeItem(key: string): Promise<void> {
    window.localStorage.removeItem(this.getKey(key));
  }

  async length(): Promise<number> {
    let count = 0;
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        count++;
      }
    }
    return count;
  }

  async clear(): Promise<void> {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => window.localStorage.removeItem(key));
  }
}

export class PersistentQueue<T> {
  private store: StorageDriver;
  private isProcessing: boolean = false;
  private queueName: string;

  constructor(name: string = 'om_events_queue') {
    this.queueName = name;
    
    // Check if we are in a browser environment with storage support
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      this.store = new BrowserStorage(name);
    } else {
      // Fallback to in-memory storage for Node.js or environments without storage
      this.store = new InMemoryStorage();
    }
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
