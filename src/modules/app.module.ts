import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config, PostgresConfig } from 'src/config/config.type';
import { UserEntity } from 'src/database/entities/user.entity';
import configuration from '../config/configuration';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
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
          entities: [UserEntity],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
