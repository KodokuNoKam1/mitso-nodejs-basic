import { promises as fs } from 'fs';
import path from 'path';

const read = async () => {
    const fileToRead = path.join('files', 'fileToRead.txt');

    try {
        await fs.access(fileToRead);
        console.log(`Файл ${fileToRead} найден.`);

        const content = await fs.readFile(fileToRead, 'utf8');
        console.log('Содержимое файла:');
        console.log(content);
    } catch (err) {
        console.error('Ошибка:', err.message);
        throw new Error('Операция с файловой системой не удалась');
    }
};

await read();