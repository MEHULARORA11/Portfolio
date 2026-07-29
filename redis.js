import Redis from 'ioredis'
import 'dotenv/config'

const REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING
const REDIS_PASSWORD = process.env.REDIS_PASSWORD?.trim()

function createRedisClient(){
    const options = {
        // avoid throwing on transient failures during commands
        maxRetriesPerRequest: null,
        // helpful for debugging connection problems
        enableReadyCheck: true,
    };
    if (REDIS_PASSWORD) {
        options.password = REDIS_PASSWORD;
    }

    const client = REDIS_CONNECTION_STRING
        ? new Redis(REDIS_CONNECTION_STRING, options)
        : new Redis(options);

    client.on('connect', () => {
        console.log('Redis: connecting...');
    });
    client.on('ready', () => {
        console.log('Redis: ready');
    });
    client.on('end', () => {
        console.log('Redis: connection closed');
    });
    client.on('error', (err) => {
        console.error('Redis Client Error:', err.message || err);
    });

    return client;
}

export const redis = createRedisClient()