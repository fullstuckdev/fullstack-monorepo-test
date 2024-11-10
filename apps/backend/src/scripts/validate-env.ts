import { validateEnv } from '../utils/env-validator';

try {
  validateEnv();
  console.log('✅ Environment variables validated successfully');
  process.exit(0);
} catch (error) {
  console.error('❌ Environment validation failed:', (error as Error).message);
  process.exit(1);
} 