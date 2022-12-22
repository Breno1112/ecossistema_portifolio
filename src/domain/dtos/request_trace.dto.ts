import { RequestDTO } from "./request.dto"
import { ResponseDTO } from "./response.dto"

export type RequestTraceDTO = {
    request: RequestDTO,
    response: ResponseDTO,
    route_steps: any[],
    business_steps: any[]
}

export type ProgrammaticRequestTraceDTO = {
    route_steps: any[],
    business_steps: any[]
}