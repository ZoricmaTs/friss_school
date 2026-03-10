import exec from 'node:child_process';

/// File starts two npm runs simultaneously and waits until some of them closes
async function run() {
  return Promise.all([
    exec.exec('npm run server-admin', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }),
    exec.exec('npm run dev-admin', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }),
  ]).then(null,  reason => {
    console.error('Failed to run npm scripts', reason);
  });
}

run().then(null);
