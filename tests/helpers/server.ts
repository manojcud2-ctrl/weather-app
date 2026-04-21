import { spawn, type ChildProcess } from 'child_process';
import path from 'path';

export async function startServer() {
  const serverPath = path.resolve(__dirname, '../..', 'server.js');

  const proc: ChildProcess = spawn(process.execPath, [serverPath], {
    stdio: 'pipe',
    env: { ...process.env, PORT: '3000' },
  });

  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Server did not start in time')), 10_000);

    proc.stdout?.on('data', (data) => {
      const text = data.toString();
      if (text.includes('Server running')) {
        clearTimeout(timeout);
        resolve();
      }
    });

    proc.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });

  return proc;
}

export async function stopServer(proc: ChildProcess | undefined) {
  if (!proc || proc.killed) return;

  proc.kill();
  await new Promise<void>((resolve) => {
    proc.on("exit", () => resolve());
  });
}
