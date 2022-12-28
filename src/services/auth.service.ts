import { KeyPairGenerationDTO } from "../domain/dtos/encryption.domain";
import { generatKeys } from "./encryption.service";

export async function generateKeysForLogin(): Promise<KeyPairGenerationDTO> {
    const keys = generatKeys();
    return {
        public_key: keys.public_key,
        id: '',
        error: undefined
    };
}