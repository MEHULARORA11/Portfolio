import Redis from 'ioredis'
import 'dotenv/config'

const REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING

 function createRedisClient(){
    return new Redis(REDIS_CONNECTION_STRING)
}

export const redis = createRedisClient()