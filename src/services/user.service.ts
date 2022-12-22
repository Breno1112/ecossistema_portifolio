import { CreateUserResponse, DeleteUserResponse, UserDTO } from "../domain/dtos/user/user.domain";
import { postgresCreateUser, postgresDeleteUserById, postgresGetUserById, postgresListUsers } from "../drivers/postgres.driver";
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

export async function deleteUser(req: Request, userId: string): Promise<DeleteUserResponse> {
    const result: DeleteUserResponse = {
        userId: userId,
        deleted: false,
        error: undefined
    };
    routeStepLog(req, `getting user with id ${userId} from database`);
    const user = await postgresGetUserById(userId);
    routeStepLog(req, `got user ${user} from database with id ${userId}`);
        if(user == null) {
            result.deleted = false;
            result.error = `User with id ${userId} not found`;
            businessLog(req, result.error);
        } else {
            routeStepLog(req, `trying to delete user ${userId} from databse`);
            const deleted = await postgresDeleteUserById(userId);
            routeStepLog(req, `user ${userId} deleted: ${deleted}`);
            result.deleted = deleted;
            if(deleted) {
                result.error = undefined;
            } else {
                result.error = `Could not delete user with id ${userId}`;
                businessLog(req, result.error);
            }
        }
    return result;
}