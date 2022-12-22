import { IncomingHttpHeaders } from "http"

export type RequestDTO = {
    path: string,
    headers: IncomingHttpHeaders,
    queryparams: any,
    params: any,
    body: any
}