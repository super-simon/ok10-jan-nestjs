import * as dotenv from 'dotenv';
import * as path from 'node:path';
import { DataSource } from 'typeorm';
import getter from './src/config/configuration';

dotenv.config({ path: './environments/local.env' });

const databaseConfig = getter().postgres;

export default new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.db,
  entities: [
    path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ],
  synchronize: false,
});
