import { promises as fs } from 'fs';
import path from 'path';

const create = async () => {
    const dirPath = path.join('files');
    const filePath = path.join(dirPath, 'fresh.txt');

    try {
        await fs.access(filePath);
        throw new Error('Операция с файловой системой не удалась');
    } catch (err) {
        if (err.code === 'ENOENT') {
            try {
                await fs.mkdir(dirPath, { recursive: true });

                await fs.writeFile(filePath, 'I am fresh and young');
            } catch {
                throw new Error('Операция с файловой системой не удалась');
            }
        } else {
            throw new Error('Операция с файловой системой не удалась');
        }
    }
};

await create();