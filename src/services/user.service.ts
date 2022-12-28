import { CreateUserResponse, DeleteUserResponse, DeleteUserResponseDTO, UserDTO } from "../domain/dtos/user.domain";
import { postgresCreateUser, postgresDeleteUserById, postgresGetUserById, postgresListUsers } from "../drivers/postgres.driver";
import { Request } from 'express';
import { businessLog, routeStepLog } from "./logger.service";
import { databaseCreateUser, databaseDeleteUserById, databaseGetUserById, databaseListUsers } from "./database.service";

export async function listUsers(req: Request): Promise<UserDTO[]> {
    const response = await databaseListUsers();
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
    const response = await databaseCreateUser(user);
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

export async function deleteUser(req: Request, userId: string): Promise<DeleteUserResponseDTO> {
    const result: DeleteUserResponseDTO = {
        userId: userId,
        deleted: false,
        error: undefined
    };
    routeStepLog(req, `getting user with id ${userId} from database`);
    const user = await databaseGetUserById(userId);
    routeStepLog(req, `got user ${JSON.stringify(user)} from database with id ${userId}`);
        if(user.user == null) {
            result.deleted = false;
            result.error = `User with id ${userId} not found`;
            businessLog(req, user.business_error);
            routeStepLog(req, user.route_step_error)
        } else {
            routeStepLog(req, `trying to delete user ${userId} from databse`);
            const deletion = await databaseDeleteUserById(userId);
            result.deleted = deletion.deleted;
            routeStepLog(req, `user ${userId} deleted: ${result.deleted}`);
            if(result.deleted) {
                result.error = undefined;
            } else {
                result.error = `Could not delete user with id ${userId}`;
                businessLog(req, deletion.business_error);
                routeStepLog(req, deletion.route_step_error);
            }
        }
    return result;
}