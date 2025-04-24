import { Transform } from 'stream';

const transform = async () => {

     const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            // Переворачиваем текст
            const reversed = chunk.toString().split('').reverse().join('');
            this.push(reversed);
            callback();
        }
    });

    console.log('Введите текст для переворота. Для завершения используйте Ctrl+C.');

    process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();