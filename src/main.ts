import { ec as EC } from 'elliptic';
import express, { Request } from 'express';
import bodyParser from 'body-parser';
import { join } from 'path';

// Create and initialize EC context
// (better do it once and reuse it)
var ec = new EC('p521');

// Generate keys
var key = ec.genKeyPair();

console.log('public:', key.getPublic('hex'));
console.log('private:', key.getPrivate('hex'));

const server = express();

key.inspect()

server.use(bodyParser.json());

let path = join(__dirname, 'public');
server.use('/', express.static(path));

server.post('/sign', (req: Request<{ message: string }>, res) => {
    console.log(req.body);
    const signature = key.sign(req.body.message).toDER('hex');
    res.json(JSON.stringify({ signature }));
});

server.post('/verify', (req: Request<{ message: string, signature: string }>, res) => {
    const verified = key.verify(req.body.message, req.body.signature);
    console.log('Verified:', verified);
    res.send(`Verified: ${verified}`);
});

server.listen(3000);
