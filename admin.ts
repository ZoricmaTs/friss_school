import exec from 'node:child_process';

/// File starts two npm runs simultaneously and waits until some of them closes
async function run() {
  const serverPromise = new Promise((_resolve, reject) => {
    const server = exec.spawn('npm.cmd', ['run', 'server-admin'], {shell: true});

    server.stdout.on('data', (data) => {
      console.log(`Server stdout chunk: ${data}`);
    });

    server.stderr.on('data', (data) => {
      console.error(`Server stderr chunk: ${data}`);
    });

    server.on('close', (code) => {
      reject(`Server was closed: ${code}`);
    });
  });

  const devAdminPromise = new Promise((_resolve, reject) => {
    const devAdmin = exec.spawn('npm.cmd', ['run', 'dev-admin'], {shell: true});

    devAdmin.stdout.on('data', (data) => {
      console.log(`App stdout chunk: ${data}`);
    });

    devAdmin.stderr.on('data', (data) => {
      console.error(`App stderr chunk: ${data}`);
    });

    devAdmin.on('close', (code) => {
      reject(`App was closed: ${code}` );
    });
  });


  return Promise.all([
    serverPromise,
    devAdminPromise,
  ]).then(null, reason => {
    console.error('Failed to run npm scripts', reason);
  });
}

run().then(null);
