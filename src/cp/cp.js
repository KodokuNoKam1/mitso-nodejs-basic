import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
console.log('Current directory:', currentDir);

const scriptPath = path.resolve(currentDir, 'files', 'script.js');

console.log('Script path:', scriptPath);

const spawnChildProcess = (args) => {
    const child = spawn('node', [scriptPath, ...args]);

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('error', (err) => {
        console.error('Failed to start child process:', err);
    });

    child.on('exit', (code, signal) => {
        if (code !== 0) {
            console.error(`Child process exited with code ${code}`);
        } else {
            console.log(`Child process exited successfully`);
        }
        if (signal) {
            console.error(`Child process was terminated due to signal: ${signal}`);
        }
    });

    process.stdin.on('data', (chunk) => {
        child.stdin.write(chunk);
    });
};

spawnChildProcess(['arg1', 'arg2']);
