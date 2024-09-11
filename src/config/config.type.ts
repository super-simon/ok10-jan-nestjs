export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  minio: MinioConfig;
  sentry: SentryConfig;
  jwt: JwtConfig;
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

export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};

export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};
