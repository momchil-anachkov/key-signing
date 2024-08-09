import { expect } from 'chai';
import { sign, verify } from './cryptography'

describe('Message Signing and Verification', function () {
    it('signing returns a string signature', () => {
        expect(typeof sign('wow')).to.equal('string');
    });

    it('verification succeeds on an untampered message and signature', () => {
        const message = 'wow';
        const signature = sign(message);
        expect(verify(message, signature)).to.be.true;
    });

    it('verification fails on a tampered message', () => {
        const message = 'wow';
        const signature = sign(message);
        expect(verify('not-wow', signature)).to.be.false;
    });

    it('verification fails on a tampered signature', () => {
        const message = 'wow';
        sign(message);
        expect(verify(message, 'not-a-real-signature')).to.be.false;
    });
});