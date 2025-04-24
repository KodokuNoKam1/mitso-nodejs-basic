import { promises as fs } from 'fs';
import path from 'path';

const copy = async () => {
    const sourceDir = path.join('files');
    const destDir = path.join('files_copy');

    try {
        // Проверка: существует ли исходная папка
        await fs.access(sourceDir);
        console.log(`Папка ${sourceDir} найдена.`);

        // Проверка: существует ли уже целевая папка
        try {
            await fs.access(destDir);
            throw new Error('Операция с файловой системой не удалась');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw new Error('Операция с файловой системой не удалась');
            }
        }

        // Создаём целевую папку
        await fs.mkdir(destDir);
        console.log(`Папка ${destDir} успешно создана.`);

        // Получаем список файлов в исходной папке
        const files = await fs.readdir(sourceDir);
        console.log(`Найдено ${files.length} файлов для копирования:`);

        // Копируем каждый файл
        for (const file of files) {
            const sourceFile = path.join(sourceDir, file);
            const destFile = path.join(destDir, file);
            await fs.copyFile(sourceFile, destFile);
            console.log(`Файл ${file} скопирован.`);
        }
    } catch (err) {
        console.error('Ошибка:', err.message);
        throw new Error('Операция с файловой системой не удалась');
    }
};

await copy();
