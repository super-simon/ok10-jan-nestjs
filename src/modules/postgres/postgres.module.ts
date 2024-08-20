import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';
import { Config, PostgresConfig } from 'src/config/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService<Config>) => {
        const config = configService.get<PostgresConfig>('postgres');
        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.db,
          entities: [
            path.join(
              process.cwd(),
              'src',
              'dist',
              'database',
              'entities',
              '*.entity.js',
            ),
          ],
          migrations: [
            path.join(
              process.cwd(),
              'src',
              'dist',
              'database',
              'migrations',
              '*.js',
            ),
          ],
          migrationsRun: true,
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}
