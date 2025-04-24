import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';

const compress = async () => {
    const inputFilePath = './files/fileToCompress.txt';
    const outputFilePath = './files/archive.gz';
    const inputFileStream = createReadStream(inputFilePath);
    const gzipStream = createGzip();
    const outputFileStream = createWriteStream(outputFilePath);
    inputFileStream.pipe(gzipStream).pipe(outputFileStream);

    outputFileStream.on('finish', () => {
        console.log('Файл был успешно сжат в archive.gz');
    });

    outputFileStream.on('error', (err) => {
        console.error('Ошибка при записи сжатого файла:', err);
    });

    inputFileStream.on('error', (err) => {
        console.error('Ошибка при чтении исходного файла:', err);
    }); 
};

await compress();