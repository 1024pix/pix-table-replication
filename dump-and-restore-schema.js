import { env } from 'node:process';
import { execa } from 'execa';

async function main() {
  const configuration = {
    databaseUrl: env.DATABASE_URL,
    tableName: env.TABLE_NAME,
  };

  await createSchemaDump(configuration.databaseUrl, configuration.tableName);
}

async function createSchemaDump(databaseUrl, tableName) {
  const { stdout, stderr } = await execa`pg_dump 
    --clean 
    --if-exists
    --format c
    --dbname ${databaseUrl}
    --no-owner
    --no-privileges
    --no-comments
    --schema-only
    --table ${tableName}
    --file schema.dump`;
  console.error(stderr);
  console.log(stdout);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});