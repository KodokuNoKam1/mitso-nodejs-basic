import { promises as fs } from 'fs';
import path from 'path';

const remove = async () => {
    const fileToDelete = path.join('files', 'fileToRemove.txt');

    try {
        // Проверка на существование файла
        await fs.access(fileToDelete);
        console.log(`Файл ${fileToDelete} найден.`);

        // Удаление файла
        await fs.unlink(fileToDelete);
        console.log(`Файл ${fileToDelete} успешно удален.`);
    } catch (err) {
        console.error('Ошибка:', err.message);
        throw new Error('Операция с файловой системой не удалась');
    }
};

await remove();