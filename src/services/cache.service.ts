import { CacheInsertResponse } from "../domain/dtos/cache.domain";
import { CacheEnum } from "../domain/enums/cache.enum";
import { redisInsert } from "../drivers/redis.driver";


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
            return redisInsert(data)
        default:
            return {
                id:'',
                success: false,
                data: null
            }
    }
}