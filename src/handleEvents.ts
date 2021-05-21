import Queue from 'bull';

export const onProgressEvent = (event: Queue.Job<any>) => {
  console.log(`Progresso: ${event.progress()}%`);
};

export const onCompleteEvent = async (job: Queue.Job<any>, result: any) => {
  console.log(
    `Result from job "${job.id}" about user "${job.data.name}": ${result?.status || 'OK'}`
  );
};

export const onFailEvent = async (
  job: Queue.Job<any>,
  error: Error | { status: string }
) => {
  const defaultMessage = `Result from job "${job.id}" about user "${job.data.name}": `;
  if (error instanceof Error) {
    return console.log(defaultMessage, error.message || 'FAIL');
  }

  console.log(defaultMessage, error.status || 'FAIL');
};
