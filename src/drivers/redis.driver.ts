import { RedisClientType } from "@redis/client";
import { createClient } from "redis";
import { generateRandomString } from "../services/utils.service";
import { CacheInsertResponse } from "../domain/dtos/cache.domain";

let client: RedisClientType<any> | undefined;


function createConnection(): void {
    client = createClient({
        socket: {
            host: 'localhost',
            port: 5050
        }
    });
}


function connected(): boolean {
    return client != undefined;
}

export async function redisInsert(data: any): Promise<CacheInsertResponse> {
    try {
        if(!connected()) {
            createConnection();
        }
        const id = generateRandomString(20);
        client!!.set(id, data);
        return {
            id: id,
            success: true,
            data: data
        };
    } catch(error) {
        return {
            id: '',
            success: false,
            data: null
        }
    }
}