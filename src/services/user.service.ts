import { CreateUserResponse, UserDTO } from "../domain/dtos/user/user.domain";
import { postgresCreateUser, postgresListUsers } from "../drivers/postgres.driver";
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

export async function createUser(req: Request, user: UserDTO): Promise<CreateUserResponse> {
    const result: CreateUserResponse = {
        success: false,
        error: undefined
    };
    const response = await postgresCreateUser(user);
    if(response.error != undefined) {
        routeStepLog(req, {route_step_error: response.error});
        result.success = false;
        result.error = `Could not create user with username ${user.username}`;
    } else {
        result.success = true;
        result.error = undefined;
    }
    return result;
}