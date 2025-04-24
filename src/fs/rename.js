import { promises as fs } from 'fs';
import path from 'path';

const rename = async () => {
    const sourceFile = path.join('files', 'wrongFilename.txt');
    const destFile = path.join('files', 'properFilename.md');

    try {
        // Проверка на существование исходного файла
        await fs.access(sourceFile);
        console.log(`Файл ${sourceFile} найден.`);

        // Проверка на существование целевого файла
        try {
            await fs.access(destFile);
            // Если целевой файл существует, выбрасываем ошибку
            throw new Error('Операция с файловой системой не удалась');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw new Error('Операция с файловой системой не удалась');
            }
        }

        // Переименование файла
        await fs.rename(sourceFile, destFile);
        console.log(`Файл успешно переименован в ${destFile}`);
    } catch (err) {
        console.error('Ошибка:', err.message);
        throw new Error('Операция с файловой системой не удалась');
    }
};

await rename();