import Redis from 'ioredis'
import 'dotenv/config'

const REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING
const REDIS_PASSWORD = (process.env.REDIS_PASSWORD || process.env['REDIS_PASSWORD '])?.trim()

function createRedisClient(){
    const options = {};
    if (REDIS_PASSWORD) {
        options.password = REDIS_PASSWORD;
    }

    const client = REDIS_CONNECTION_STRING
        ? new Redis(REDIS_CONNECTION_STRING, options)
        : new Redis(options);

    client.on('error', (err) => {
        console.error('Redis Client Error:', err.message);
    });
    return client;
}

export const redis = createRedisClient()