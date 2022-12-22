import { UserDTO } from "../domain/dtos/user/user.domain";
import { postgresListUsers } from "../drivers/postgres.driver";
import { Request } from 'express';
import { businessLog, routeStepLog } from "./logger.service";

export async function listUsers(req: Request): Promise<UserDTO[]> {
    const response = await postgresListUsers();
    if(response.data != null) {
        return response.data;
    } else {
        businessLog(req, {
            business_error: response.business_error,
        });
        routeStepLog(req, {
            route_step_error: response.route_step_error
        });
        return [];
    }
}