import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';

const decompress = async () => {
    const inputFilePath = './files/archive.gz';
    const outputFilePath = './files/fileToCompress.txt';
    const inputFileStream = createReadStream(inputFilePath);
    const gunzipStream = createGunzip();
    const outputFileStream = createWriteStream(outputFilePath);
    inputFileStream.pipe(gunzipStream).pipe(outputFileStream);

    outputFileStream.on('finish', () => {
        console.log('Файл был успешно распакован в fileToCompress.txt');
    });

    outputFileStream.on('error', (err) => {
        console.error('Ошибка при записи распакованного файла:', err);
    });

    inputFileStream.on('error', (err) => {
        console.error('Ошибка при чтении сжатого файла:', err);
    }); 
};

await decompress();