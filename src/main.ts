import { bootstrapServer } from './server';

(async () => {
    const server = await bootstrapServer();
    server.listen(3000);
})()
