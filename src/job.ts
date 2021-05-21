import { Job, DoneCallback } from 'bull';

export default function (job: Job, done: DoneCallback) {
  console.log('Comecei!');

  console.log(job);
  
  job.progress(50);

  done();
  console.log('Terminei...')
}