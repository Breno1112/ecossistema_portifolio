import { Request, Response, NextFunction } from 'express';
import { Send } from 'express-serve-static-core';
import { RouteSteps } from '../domain/dtos/route_steps.dto';

export default async function asyncLogger(req: Request, res: Response, next: NextFunction) {
    res.send = resDotSendInterceptor(req, res, res.send);
    next();
}

const resDotSendInterceptor = (req: Request, res: Response, send: Send<any, Response<any, Record<string, any>>>) => (content: any) => {
    const routeSteps: RouteSteps = {
        request: {
            headers: req.headers,
            queryparams: req.query,
            params: req.params,
            body: req.body
        },
        response: {
            headers: res.getHeaders(),
            body: content
        }
    };
    console.log(JSON.stringify(routeSteps));
    res.send = send;
    return res.send(content);
   };