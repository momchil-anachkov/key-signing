import express, { Express, Request } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import * as swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { join } from 'path';
import { sign, verify } from './cryptography';
import fs from 'fs/promises';
import { parse } from 'yaml';

export async function bootstrapServer(): Promise<Express> {
    const server = express();
    server.use(bodyParser.json());

    // Serve The UI
    server.use('/', express.static(join(__dirname, 'ui')));

    // Set up Request Validation against the OpenAPI spec
    server.use(
        OpenApiValidator.middleware({
            apiSpec: join(__dirname, 'openapi.yaml'),
            validateRequests: true,
            validateResponses: true,
            ignorePaths: (path: string) => path.startsWith('/api-docs'),
        })
    );

    // Serve the API Docs
    const apiSpec = parse(await fs.readFile(join(__dirname, '/openapi.yaml'), 'utf-8'));
    server.use('/api-docs', swaggerUi.serve);
    server.get('/api-docs', swaggerUi.setup(apiSpec));


    server.post('/sign', (req: Request<{ message: string }>, res) => {
        try {
            const signature = sign(req.body.message);
            res.json({ signature });
        } catch (e) {
            // Don't leak out things from the backend.
            console.error(e);
            res.status(500).send();
        }
    });

    server.post('/verify', (req: Request<{ message: string, signature: string }>, res) => {
        try {
            const verified = verify(req.body.message, req.body.signature);
            res.json({ verified });
        } catch (e) {
            // Don't leak out things from the backend.
            console.error(e);
            res.status(500).send
        }
    });

    return server;
}
