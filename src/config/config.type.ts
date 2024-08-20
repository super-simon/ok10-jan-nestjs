export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  minio: MinioConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type PostgresConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  db: string;
};

export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};

export type MinioConfig = {
  user: string;
  password: string;
};
