import exec from 'node:child_process';
import open from 'open';

/// File starts two npm runs simultaneously and waits until some of them closes
async function run() {
  new Promise(resolve => setTimeout(resolve, 10000)).then(() => {
    return open('http://localhost:3010/admin');
  }).catch(null);

  return Promise.all([
    exec.exec('npm run admin-server'),
    exec.exec('npm run dev'),
  ]);
}

run().then(null);
