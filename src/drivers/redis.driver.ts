import { RedisClientType } from "@redis/client";
import { createClient } from "redis";
import { generateRandomString } from "../services/utils.service";

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

export async function insert(data: any): Promise<void> {
    if(!connected()) {
        createConnection();
    }
    const id = generateRandomString(20);
    client!!.set(id, data);
}