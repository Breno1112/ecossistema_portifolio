export type CacheInsertResponse = {
    id: string;
    success: boolean;
    data: any
}

export type CacheGetResponse = {
    success: boolean;
    data: any;
    business_error: string | undefined;
    route_step_error: string | undefined;
}