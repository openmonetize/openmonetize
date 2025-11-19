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
