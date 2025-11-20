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

import { getPrismaClient, hashApiKey } from '@openmonetize/common';

const db = getPrismaClient();
const DEMO_API_KEY = 'om_live_demo123';

async function debug() {
  console.log('Debugging Auth...');
  
  const expectedHash = hashApiKey(DEMO_API_KEY);
  console.log(`Expected Hash for '${DEMO_API_KEY}': ${expectedHash}`);
  
  const customer = await db.customer.findFirst({
    where: {
      email: 'demo@openmonetize.com',
    },
  });
  
  if (!customer) {
    console.log('Demo customer NOT FOUND');
  } else {
    console.log('Demo customer FOUND:');
    console.log(`ID: ${customer.id}`);
    console.log(`Stored Hash: ${customer.apiKeyHash}`);
    console.log(`Status: ${customer.status}`);
    console.log(`Match? ${customer.apiKeyHash === expectedHash}`);
  }
  
  await db.$disconnect();
}

debug().catch(console.error);
