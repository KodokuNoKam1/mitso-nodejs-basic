import { promises as fs } from 'fs';
import path from 'path';

const list = async () => {
    const folderPath = path.join('files');

    try {
        // Проверка на существование папки
        await fs.access(folderPath);
        console.log(`Папка ${folderPath} найдена.`);

        // Получаем список файлов в папке
        const files = await fs.readdir(folderPath);
        console.log('Список файлов в папке:');
        files.forEach(file => console.log(file));
    } catch (err) {
        console.error('Ошибка:', err.message);
        throw new Error('Операция с файловой системой не удалась');
    }
};

await list();