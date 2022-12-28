import { RedisClientType } from "@redis/client";
import { createClient } from "redis";
import { generateRandomString } from "../services/utils.service";
import { CacheInsertResponse } from "../domain/dtos/cache.domain";

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