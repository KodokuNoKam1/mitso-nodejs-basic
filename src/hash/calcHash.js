import fs from 'fs';
import crypto from 'crypto';

const calculateHash = async () => {
    const filePath = './files/fileToCalculateHashFor.txt';

    if (!fs.existsSync(filePath)) {
        throw new Error('Операция с файловой системой не удалась');
    }

    const hash = crypto.createHash('sha256'); // Создаем хэш с алгоритмом SHA256

    const fileStream = fs.createReadStream(filePath);

    // Чтение файла и вычисление хэша
    fileStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    // Завершаем вычисление хэша и выводим результат
    fileStream.on('end', () => {
        const hexHash = hash.digest('hex');
        console.log(`SHA256 Hash: ${hexHash}`);
    });

    fileStream.on('error', (err) => {
        console.error('Ошибка при чтении файла:', err);
    }); 
};

await calculateHash();