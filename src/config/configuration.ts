export default () => ({
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
});
