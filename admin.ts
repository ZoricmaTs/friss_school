import exec from 'node:child_process';

/// File starts two npm runs simultaneously and waits until some of them closes
async function run() {
  return Promise.all([
    exec.exec('npm run admin-server'),
    exec.exec('npm run dev-admin'),
  ]);
}

run().then(null);
