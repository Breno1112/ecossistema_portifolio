import { generateKeyPairSync } from "crypto";
import { GeneratedKeyPair } from "../domain/dtos/encryption/encryption.domain";


export function generatKeys(): GeneratedKeyPair {
    const passphrase = generateRandomString(100);
    const key = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
           type: 'pkcs1',
           format: 'der'
        },
        privateKeyEncoding: {
           type: 'pkcs8',
           format: 'der',
           cipher: 'aes-192-cbc',
           passphrase: passphrase
        }
     },);
     return {
        passphrase: passphrase,
        public_key: key.publicKey.toString('base64'),
        private_key: key.privateKey.toString('base64')
     }
}


function generateRandomString(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}