import http from 'http';
import https from 'https';


export const getJSON = (options) => {
    const port = options.port == 443 ? https : http;

    return new Promise((resolve, reject) => {
        let req = port.get(options.URL);
        req.on('response', res => {
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                    return;
                }
                resolve(body);
            });
        });

        req.on('error', err => {
            reject(err);
        });
    });

};

// https.get('https://www.googleapis.com/books/v1/volumes?q=${query}', async res => {
//             try {
//                 let body = '';
//                 res.setEncoding('utf-8');
//                 for await (const chunk of res) {
//                     body += chunk;
//                 }
//                 console.log('RESPONSE', body);
//             } catch (e) {
//                 console.log('ERROR', e);
//             }
//         });