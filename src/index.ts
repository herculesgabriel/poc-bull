import Queue from 'bull';
import {
  reportingProgress,
  callingDoneLater,
  callingDoneWithResultData,
  returningPromise,
} from './jobExamples';

import { onCompleteEvent, onFailEvent, onProgressEvent } from './handleEvents';

const queueOptions = { redis: { host: '127.0.0.1', port: 6379 } };
const jobOptions = { attempts: 3, delay: 5000 };

const addUserQueue = new Queue('add user job', queueOptions);

addUserQueue.on('progress', onProgressEvent);
addUserQueue.on('completed', onCompleteEvent);
addUserQueue.on('failed', onFailEvent);

const data = { name: 'Hercules', age: 24 };

addUserQueue.add(data, jobOptions);

// addUserQueue.process(reportingProgress);
// addUserQueue.process(callingDoneLater);
// addUserQueue.process(callingDoneWithResultData);
addUserQueue.process(returningPromise);
