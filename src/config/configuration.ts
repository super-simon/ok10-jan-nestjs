import { Config } from './config.type';

export default (): Config => ({
  app: {
    port: Number(process.env.APP_PORT) || 3000,
    host: process.env.APP_HOST || 'localhost',
  },
  postgres: {
    port: Number(process.env.POSTGRES_PORT) || 5432,
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'user',
    password: process.env.POSTGRES_PASSWORD || 'password',
    db: process.env.POSTGRES_DB || 'jan-2024',
  },
  redis: {
    port: Number(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASSWORD || 'password',
  },
  minio: {
    user: process.env.MINIO_ROOT_USER || 'user',
    password: process.env.MINIO_ROOT_PASSWORD || 'password',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    env: process.env.SENTRY_ENV,
    debug: process.env.SENTRY_DEBUG === 'true',
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: Number(process.env.JWT_EXPIRES_IN),
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN),
  },
  aws: {
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    bucketURL: process.env.AWS_S3_BUCKET_URL,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    endpoint: process.env.AWS_S3_ENDPOINT,
  },
});
