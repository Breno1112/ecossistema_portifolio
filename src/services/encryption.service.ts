import { generateKeyPairSync } from "crypto";
import { GeneratedKeyPair } from "../domain/dtos/encryption.domain";
import { generateRandomString } from "./utils.service";


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