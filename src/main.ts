import { ec as EC } from 'elliptic';
import express, { Request } from 'express';
import bodyParser from 'body-parser';
import { join } from 'path';

var ec = new EC('p521');

var keyPair = ec.genKeyPair();

console.log('public:', keyPair.getPublic('hex'));
console.log('private:', keyPair.getPrivate('hex'));

const server = express();
server.use(bodyParser.json());

let staticPath = join(__dirname, 'public');
server.use('/', express.static(staticPath));

server.post('/sign', (req: Request<{ message: string }>, res) => {
    const signature = keyPair.sign(req.body.message).toDER('hex');
    res.json(JSON.stringify({ signature }));
});

server.post('/verify', (req: Request<{ message: string, signature: string }>, res) => {
    const verified = keyPair.verify(req.body.message, req.body.signature);
    res.send(`Verified: ${verified}`);
});

server.listen(3000);
