import Queue from 'bull';
import {
  reportingProgress,
  callingDoneLater,
  callingDoneWithResultData,
} from './jobExamples';

const queueOptions = { redis: { host: '127.0.0.1', port: 6379 } };
const jobOptions = { attempts: 2, delay: 5000 };
const data = { name: 'Hercules', age: 24 };

const addUserQueue = new Queue('add user job', queueOptions);

addUserQueue.add(data, jobOptions);

addUserQueue.on('progress', (event) => {
  console.log(`Progresso: ${event.progress()}%`);
});

addUserQueue.on('completed', async (job, result) => {
  console.log(
    `Result from job "${job.id}" about user "${job.data.name}": ${result?.status || 'OK'}`
  );
});

addUserQueue.process(reportingProgress);
// addUserQueue.process(callingDoneLater);
// addUserQueue.process(callingDoneWithResultData);
