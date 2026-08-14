import Redis from 'ioredis';

const REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD?.trim();

function createRedisClient() {
  const options: any = {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  };
  
  if (REDIS_PASSWORD) {
    options.password = REDIS_PASSWORD;
  }

  const client = REDIS_CONNECTION_STRING
    ? new Redis(REDIS_CONNECTION_STRING, options)
    : new Redis(options);

  client.on('error', (err) => {
    console.error('Redis Client Error:', err.message || err);
  });

  return client;
}

export const redis = createRedisClient();
