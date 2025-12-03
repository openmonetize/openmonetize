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


import { describe, it, expect } from 'vitest';
import { OpenMonetize } from '../index';
import { OpenMonetize as ClientOpenMonetize } from '../client';

describe('SDK Entry Point', () => {
  it('should export OpenMonetize class', () => {
    expect(OpenMonetize).toBeDefined();
    expect(OpenMonetize).toBe(ClientOpenMonetize);
  });

  it('should be instantiable', () => {
    const client = new OpenMonetize({ apiKey: 'test' });
    expect(client).toBeInstanceOf(OpenMonetize);
    expect(client).toBeInstanceOf(ClientOpenMonetize);
  });

  it('should have expected methods', () => {
    const client = new OpenMonetize({ apiKey: 'test' });
    expect(typeof client.trackTokenUsage).toBe('function');
    expect(typeof client.flush).toBe('function');
    expect(typeof client.ingestEvents).toBe('function');
  });
});
