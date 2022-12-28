import { RedisClientType } from "@redis/client";
import { createClient } from "redis";
import { generateRandomString } from "../services/utils.service";
import { CacheGetResponse, CacheInsertResponse } from "../domain/dtos/cache.domain";

let client: RedisClientType<any> | undefined;


async function createConnection(): Promise<void> {
    client = createClient({
        socket: {
            host: 'localhost',
            port: 5050
        }
    });
    await client.connect();
}


function connected(): boolean {
    return client != undefined;
}

export async function redisInsert(data: object): Promise<CacheInsertResponse> {
    try {
        if(!connected()) {
            createConnection();
        }
        const id = generateRandomString(20);
        await client!!.set(id, JSON.stringify(data));
        return {
            id: id,
            success: true,
            data: data
        };
    } catch(error) {
        console.log(error);
        return {
            id: '',
            success: false,
            data: null
        }
    }
}

export async function redisGet(key: string): Promise<CacheGetResponse> {
    try {
        if(!connected()) {
            createConnection();
        }
        const getResponse = await client!!.get(key);
        return {
            success: true,
            data: getResponse != null ? JSON.parse(getResponse) : getResponse,
            business_error: undefined,
            route_step_error: undefined
        }
    } catch(error) {
        return {
            success: false,
            data: undefined,
            business_error: `Não foi possível buscar a chave ${key} no cache`,
            route_step_error: `${error}`
        }
    }
}