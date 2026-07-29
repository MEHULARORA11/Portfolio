import {Queue} from 'bullmq'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// load .env from current working dir first
dotenv.config();

// If running from the emailQueue folder, try loading the repository root .env too
const rootEnvPath = path.resolve(process.cwd(), '..', '.env');
if (fs.existsSync(rootEnvPath)) {
    dotenv.config({ path: rootEnvPath });
    console.log('Loaded parent .env from', rootEnvPath);
}

// Normalize common env keys if they were mis-specified with surrounding spaces in .env
const normalizeEnvKey = (key) => {
    if (!process.env[key]) {
        const alt1 = process.env[`${key} `];
        const alt2 = process.env[` ${key}`];
        if (alt1) process.env[key] = alt1.trim();
        else if (alt2) process.env[key] = alt2.trim();
    }
}
['REDIS_CONNECTION_STRING','REDIS_HOST','REDIS_PORT','REDIS_PASSWORD'].forEach(normalizeEnvKey);

const REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined
const REDIS_PASSWORD = process.env.REDIS_PASSWORD

let connection;
if (REDIS_CONNECTION_STRING) {
    try {
        const url = new URL(REDIS_CONNECTION_STRING);
        // if a separate password is provided in env and the URL has no auth,
        // inject it so BullMQ/ioredis authenticate properly.
        if (REDIS_PASSWORD && !url.password) {
            url.password = REDIS_PASSWORD;
            connection = { url: url.toString() };
        } else {
            connection = { url: REDIS_CONNECTION_STRING };
        }
    } catch (e) {
        console.warn('Invalid REDIS_CONNECTION_STRING, falling back to host/port. Error:', e?.message || e);
        connection = {
            host: REDIS_HOST,
            port: REDIS_PORT,
            password: REDIS_PASSWORD
        };
    }
} else {
    connection = {
        host: REDIS_HOST,
        port: REDIS_PORT,
        password: REDIS_PASSWORD
    };
}

const emailQueue = new Queue('email-queue', { connection })

console.log('BullMQ connection config using', REDIS_CONNECTION_STRING ? 'REDIS_CONNECTION_STRING' : 'host/port');

export {
    emailQueue,
    connection
}