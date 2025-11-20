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

import { buildApp } from '../packages/api-gateway/src/index';
import fs from 'fs';
import path from 'path';

async function generate() {
  console.log('Initializing API Gateway...');
  const app = await buildApp();
  
  console.log('Generating OpenAPI spec...');
  await app.ready();
  
  const openapi = app.swagger();
  
  const outputPath = path.resolve(__dirname, '../openapi.json');
  fs.writeFileSync(outputPath, JSON.stringify(openapi, null, 2));
  
  console.log(`OpenAPI spec written to ${outputPath}`);
  
  await app.close();
  process.exit(0);
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
