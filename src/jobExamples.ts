import { Job, DoneCallback } from 'bull';

import { addUser } from './addUser';
import { delay } from './utils';

export const reportingProgress = async (job: Job, done: DoneCallback) => {
  console.log('Vou começar as atividades...');

  console.log('Definindo progresso para 20...');
  job.progress(20);
  await delay();

  console.log('Definindo progresso para 50...');
  job.progress(50);
  await delay();

  console.log('Definindo progresso para 100...');
  job.progress(100);
  await delay();

  console.log('Vou chamar o done...');
  done();
  console.log('Terminei!');
};

export const callingDoneLater = async (job: Job, done: DoneCallback) => {
  console.log('Vou adicionar um usuário ao banco...');
  return addUser(job.data, done);
};

export const callingDoneWithResultData = async (job: Job, done: DoneCallback) => {
  console.log('Vou adicionar um usuário ao banco...');

  console.log('Definindo progresso para 20...');
  job.progress(20);
  await delay();

  await addUser(job.data);
  console.log('Definindo progresso para 100...');
  job.progress(100);

  console.log('Vou chamar o done...');
  done(null, { status: 'Deu bom!' });
};
