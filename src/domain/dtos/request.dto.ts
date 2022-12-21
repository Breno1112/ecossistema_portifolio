import { IncomingHttpHeaders } from "http"

export type RequestDTO = {
    headers: IncomingHttpHeaders,
    queryparams: any,
    params: any,
    body: any
}