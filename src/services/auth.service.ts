import { KeyPairGenerationDTO } from "../domain/dtos/encryption.domain";
import { cacheInsert } from "./cache.service";
import { generatKeys } from "./encryption.service";

export async function generateKeysForLogin(): Promise<KeyPairGenerationDTO> {
    const keys = generatKeys();
    const insertResponse = await cacheInsert(keys);
    return {
        public_key: keys.public_key,
        id: insertResponse.id,
        error: undefined
    };
}