import { Request, Response, NextFunction } from 'express';
import { Send } from 'express-serve-static-core';
import { ProgrammaticRequestTraceDTO, RequestTraceDTO } from '../domain/dtos/request_trace.dto';



let count = 0;

const current_loggers = new Map<string, ProgrammaticRequestTraceDTO>();

export default async function asyncLogger(req: Request, res: Response, next: NextFunction) {
    initLogger(req);
    res.send = resDotSendInterceptor(req, res, res.send);
    next();
}

function getCount(): number {
    return count;
}

function addCount(): void {
    count = count + 1;
}

function clearRequestId(req: Request): void {
    req.headers["request-id"] = undefined;
}

const resDotSendInterceptor = (req: Request, res: Response, send: Send<any, Response<any, Record<string, any>>>) => (content: any) => {
    const programmaticLoggingData = flushLogger(req);
    clearRequestId(req);
    const routeSteps: RequestTraceDTO = {
        request: {
            path: `${req.method} ${req.path}`,
            headers: req.headers,
            queryparams: req.query,
            params: req.params,
            body: req.body
        },
        response: {
            headers: res.getHeaders(),
            body: content,
            status_code: res.statusCode
        },
        route_steps: programmaticLoggingData.route_steps,
        business_steps: programmaticLoggingData.business_steps
    };
    console.log(JSON.stringify(routeSteps));
    res.send = send;
    addCount();
    return res.send(content);
   };

function getLogIdByRequest(req: Request): string | null {
    const got = req.headers["request-id"];
    if(got != undefined) {
        if(typeof got == 'string') {
            return got;
        } else {
            return got[0];
        }
    }
    return null;
}

function generateLogId(): string {
    addCount();
    return getCount().toString();
}

function initLogger(req: Request): void {
    const logId = generateLogId();
    current_loggers.set(logId, {
        route_steps: [],
        business_steps: []
    });
    req.headers["request-id"] = logId;
}

function addRouteStep(id: string, route_step: any): void {
    current_loggers.get(id)!.route_steps.push(route_step);
}

function addBusinessStep(id: string, business_step: any): void {
    current_loggers.get(id)!.business_steps.push(business_step);
}

async function log(req: Request, route_step: any | null, business_step: any | null): Promise<void> {
    const id = getLogIdByRequest(req);
    if(id != null) {
        if (route_step != null) {
            addRouteStep(id, route_step);
        }else if (business_step != null) {
            addBusinessStep(id, business_step);
        }
    }
}

export async function businessLog(req: Request, business_step: any) : Promise<void> {
    return log(req, null, business_step);
}

export async function routeStepLog(req:Request, route_step: any) {
    return log(req, route_step, null);
}

function flushLogger(req: Request): ProgrammaticRequestTraceDTO {
    let response: ProgrammaticRequestTraceDTO;
    const id = getLogIdByRequest(req);
    if(id != null) {
        response = current_loggers.get(id)!;
        current_loggers.delete(id);
    } else {
        response = {
            business_steps: [],
            route_steps: []
        };
    }
    return response;
}