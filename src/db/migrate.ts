import path from 'node:path'

import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

import { env } from '@/env'

import * as schema from './schema'

const main = async () => {
  try {
    const db = drizzle({
      connection: env.DATABASE_URL,
      schema
    })

    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), 'src/db/migrations')
    })
    console.log('🎉 Database migration successfully!')
  } catch (error) {
    console.error('❌ Database migration failed:\n', error)
  }
}

await main()
