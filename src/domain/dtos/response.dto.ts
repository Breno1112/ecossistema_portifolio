import { OutgoingHttpHeaders } from "http"

export type ResponseDTO = {
    headers: OutgoingHttpHeaders,
    body: string,
    status_code: number
}