import { ec as EC } from 'elliptic';
import { createHash } from 'crypto';

const ec = new EC('p521');
const keyPair = ec.genKeyPair();

export function sign(message: string): string {
    const hexMessage = hashToHex(message);
    return keyPair.sign(hexMessage).toDER('hex');
}

export function verify(message: string, signature: string): boolean {
    const hexMessage = hashToHex(message);

    try {
        return keyPair.verify(hexMessage, signature);
    } catch (e) {
        // Don't throw on a malformed signature
        return false;
    }
}

function hashToHex(str: string): string {
    return createHash('sha256').update(str).digest('hex');
}

