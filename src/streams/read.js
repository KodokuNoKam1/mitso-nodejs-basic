import fs from 'fs';

const read = async () => {
    const filePath = './files/fileToRead.txt'; // Путь к файлу

    // Проверка, существует ли файл
    if (!fs.existsSync(filePath)) {
        throw new Error('Операция с файловой системой не удалась');
    }

    // Создание потока для чтения файла
    const readStream = fs.createReadStream(filePath, 'utf8');

    // Печать содержимого файла в process.stdout
    readStream.pipe(process.stdout);

    // Обработка ошибок потока
    readStream.on('error', (err) => {
        console.error('Ошибка при чтении файла:', err);
    });
};

await read();