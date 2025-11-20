import fs from 'fs';

import { glob } from 'glob';

const AGPL_HEADER = `/*
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
`;

const MIT_HEADER = `/*
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
`;

const BACKEND_PACKAGES = [
  'packages/api-gateway/src',
  'packages/ingestion-service/src',
  'packages/rating-engine/src',
  'packages/common/src',
];

const SDK_PACKAGES = [
  'packages/sdk/src',
];

async function processFiles(directories: string[], header: string, checkOnly: boolean) {
  let hasErrors = false;

  for (const dir of directories) {
    const files = await glob(`${dir}/**/*.{ts,tsx}`, { ignore: ['**/node_modules/**', '**/dist/**', '**/*.d.ts'] });
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      if (content.includes('Copyright (C)')) {
        // Header likely exists, check if it matches (simplified check)
        if (!content.includes('OpenMonetize')) {
             // Different copyright?
             // For now, assume if Copyright is there, it's handled or we shouldn't touch it blindly.
             // But we want to enforce OUR header.
             // Let's check if it starts with our specific header.
             const trimmedContent = content.trimStart();
             const trimmedHeader = header.trim();
             if (trimmedContent.startsWith(trimmedHeader.substring(0, 50))) {
                 continue; // Already has our header
             }
        } else {
            continue; // Already has OpenMonetize copyright
        }
      }

      if (checkOnly) {
        console.error(`Missing license header in ${file}`);
        hasErrors = true;
      } else {
        console.log(`Adding license header to ${file}`);
        fs.writeFileSync(file, header + '\n' + content);
      }
    }
  }
  return hasErrors;
}

async function main() {
  const checkOnly = process.argv.includes('--check');
  
  console.log(`Running license ${checkOnly ? 'check' : 'fix'}...`);

  const backendErrors = await processFiles(BACKEND_PACKAGES, AGPL_HEADER, checkOnly);
  const sdkErrors = await processFiles(SDK_PACKAGES, MIT_HEADER, checkOnly);

  if (checkOnly && (backendErrors || sdkErrors)) {
    console.error('License check failed. Run with no arguments to fix.');
    process.exit(1);
  }
  
  console.log('Done.');
}

main().catch(console.error);
