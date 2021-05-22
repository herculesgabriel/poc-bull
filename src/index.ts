import Queue from 'bull';
import {
  reportingProgress,
  callingDoneLater,
  callingDoneWithResultData,
  returningPromise,
  throwableJob,
} from './jobExamples';

import { onCompleteEvent, onFailEvent, onProgressEvent } from './handleEvents';

const queueOptions = { redis: { host: '127.0.0.1', port: 6379 } };
const jobOptions = { attempts: 5, delay: 5000 };

/* create queues */
const addUserQueue = new Queue('add user job', queueOptions);
// const throwableJobQueue = new Queue('throwable job', queueOptions);

/* assign event handlers */
addUserQueue.on('progress', onProgressEvent);
addUserQueue.on('completed', onCompleteEvent);
addUserQueue.on('failed', onFailEvent);

// throwableJobQueue.on('progress', onProgressEvent);
// throwableJobQueue.on('completed', onCompleteEvent);
// throwableJobQueue.on('failed', onFailEvent);

const someUserData = { name: 'João', age: 26 };
// const anotherUserData = { name: 'Maria', age: 34 };

/* assign processors to queues */
// addUserQueue.process(reportingProgress);
// addUserQueue.process(callingDoneWithResultData);
// addUserQueue.process(callingDoneLater);
// addUserQueue.process(throwableJob);
addUserQueue.process(returningPromise);

/* named processors */
// throwableJobQueue.process('throwable job', throwableJob);
// throwableJobQueue.process('returning promise', returningPromise);

/* start jobs */
addUserQueue.add(someUserData, jobOptions);
// throwableJobQueue.add('returning promise', anotherUserData, jobOptions);
// throwableJobQueue.add('throwable job', someUserData, jobOptions);
