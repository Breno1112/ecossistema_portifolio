import { CacheGetResponse, CacheInsertResponse } from "../domain/dtos/cache.domain";
import { CacheEnum } from "../domain/enums/cache.enum";
import { redisGet, redisInsert } from "../drivers/redis.driver";


function getSelectedCacheServer(): CacheEnum {
    switch(process.env['SELECTED_CACHE_SERVER']) {
        case 'REDIS':
            return CacheEnum.REDIS;
        default:
            return CacheEnum.NOT_FOUND
    }
}

export async function cacheInsert(data: any): Promise<CacheInsertResponse> {
    switch(getSelectedCacheServer()) {
        case CacheEnum.REDIS:
            return await redisInsert(data)
        default:
            return {
                id:'',
                success: false,
                data: null
            }
    }
}

export async function cacheGet(key: string): Promise<CacheGetResponse> {
    switch(getSelectedCacheServer()) {
        case CacheEnum.REDIS:
            return await redisGet(key);
        default:
            return {
                success: false,
                data: undefined,
                business_error: `Não foi possível buscar a chave ${key} no cache`,
                route_step_error: 'no cache server selected'
            }
    }
}