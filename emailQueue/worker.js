import {Worker} from 'bullmq'
import {connection} from './queue.js'
import {sendEmailToMehul} from './email.js'

const emailWorker_1 = new Worker('email-queue', async job => {
    console.log('Worker 1 is Processing job:', job.id, job.data);
    const { name, email, message } = job.data;
    await sendEmailToMehul(name, email, message);  
}, { connection });

// console.log('Email worker started — attempting to connect to Redis...');

const emailWorker_2 = new Worker('email-queue', async job => {
    console.log('Worker 2 is Processing job:', job.id, job.data);
    const { name, email, message } = job.data;
    await sendEmailToMehul(name, email, message);  
}, { connection });

emailWorker_1.on('completed', job => {
    console.log(`Worker 1: Job ${job.id} has completed!`);
});

emailWorker_1.on('failed', (job, err) => {
    console.error(`Worker 1: Job ${job.id} has failed with error: ${err?.message || err}`);
});

emailWorker_1.on('error', (err) => {
    console.error('Worker 1 error:', err?.message || err);
});

emailWorker_1.on('active', job => {
    console.log(`Worker 1: Job ${job.id} (name=${job.name}) is now active`);
});

emailWorker_1.on('stalled', jobId => {
    console.warn('Worker 1: Job stalled:', jobId);
});

emailWorker_2.on('completed', job => {
    console.log(`Worker 2: Job ${job.id} has completed!`);
});

emailWorker_2.on('failed', (job, err) => {
    console.error(`Worker 2: Job ${job.id} has failed with error: ${err?.message || err}`);
});

emailWorker_2.on('error', (err) => {
    console.error('Worker 2 error:', err?.message || err);
});

emailWorker_2.on('active', job => {
    console.log(`Worker 2: Job ${job.id} (name=${job.name}) is now active`);
});

emailWorker_2.on('stalled', jobId => {
    console.warn('Worker 2: Job stalled:', jobId);
});

console.log('Email worker started — attempting to connect to Redis...');
