export type GeneratedKeyPair = {
    private_key: string;
    public_key: string;
    passphrase: string;
}

export type KeyPairGenerationDTO = {
    public_key: string;
    id: string;
    error: string | undefined
}