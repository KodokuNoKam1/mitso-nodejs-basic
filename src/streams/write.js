const write = async () => {
    const filePath = './files/fileToWrite.txt';

    const writeStream = fs.createWriteStream(filePath);

    console.log('Введите данные для записи в файл. Для завершения используйте Ctrl+C.');

    // Перенаправляем данные из стандартного ввода в поток записи
    process.stdin.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Данные успешно записаны в файл fileToWrite.txt');
    });

    writeStream.on('error', (err) => {
        console.error('Ошибка при записи в файл:', err);
    }); 
};

await write();