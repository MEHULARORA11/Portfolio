import Redis from 'ioredis'
import 'dotenv/config'

const REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING

 function createRedisClient(){
    const client = new Redis(REDIS_CONNECTION_STRING);
    client.on('error', (err) => {
        console.error('Redis Client Error:', err.message);
    });
    return client;
}

export const redis = createRedisClient()