import { GenerateTokenRequestDTO } from "../domain/dtos/auth.domain";
import { KeyPairGenerationDTO } from "../domain/dtos/encryption.domain";
import { cacheGet, cacheInsert } from "./cache.service";
import { generatKeys } from "./encryption.service";

export async function generateKeysForLogin(): Promise<KeyPairGenerationDTO> {
    const keys = generatKeys();
    const insertResponse = await cacheInsert(keys);
    if(insertResponse.success) {
        return {
            public_key: keys.public_key,
            id: insertResponse.id,
            error: undefined
        };
    } else {
        return {
            public_key: undefined,
            id: undefined,
            error: "Não foi possível gerar as chaves de criptografia no momento"
        };
    }
}

export async function generateToken(body: GenerateTokenRequestDTO): Promise<void> {
    const responseGot = await cacheGet(body.key_id);
    console.log(responseGot);
}