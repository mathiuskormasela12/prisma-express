// ========== Configurations
// import all modules
import 'dotenv/config'

export default {
  env: process.env?.NODE_ENV ?? '',
  port: process.env?.PORT ?? 3000,
  whitelist: process.env?.WHITELIST?.split(',') ?? [],
  dbUrl: process.env?.DB_URL
}
