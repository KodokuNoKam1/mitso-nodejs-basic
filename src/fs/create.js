import { promises as fs } from 'fs';
import path from 'path';

const create = async () => {
    const filePath = path.join('files', 'fresh.txt');

    try {
        await fs.access(filePath);
        throw new Error('Операция с файловой системой не удалась');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(filePath, 'By Kodoku No Kami');
        } else {
            throw new Error('Операция с файловой системой не удалась');
        }
    }
};

await create();