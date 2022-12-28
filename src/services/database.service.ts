import { CreateUserResponse, DeleteUserResponse, GetUserByIdResponse, UserDTO, UserListResponse } from "../domain/dtos/user.domain";
import { DatabaseEnum } from "../domain/enums/database.enum";
import { postgresCreateUser, postgresDeleteUserById, postgresGetUserById, postgresListUsers } from "../drivers/postgres.driver";

function getCurrentDatabase(): DatabaseEnum {
    switch(process.env['SELECTED_DATABASE']) {
        case 'POSTGRES':
            return DatabaseEnum.POSTGRES;
        default:
            return DatabaseEnum.NOT_FOUND;
    }
}


export async function databaseListUsers(): Promise<UserListResponse> {
    switch(getCurrentDatabase()) {
        case DatabaseEnum.POSTGRES:
            return postgresListUsers();
        default:
            return {
                data: null,
                business_error: "Não foi possível listar usuários",
                route_step_error: "No database server is selected"
            };
    }
}

export async function databaseCreateUser(user: UserDTO): Promise<CreateUserResponse> {
    switch(getCurrentDatabase()) {
        case DatabaseEnum.POSTGRES:
            return postgresCreateUser(user);
        default:
            return {
                success: false,
                error: "No database server is selected"
            };
    }
}

export async function databaseGetUserById(userId: string): Promise<GetUserByIdResponse> {
    switch(getCurrentDatabase()) {
        case DatabaseEnum.POSTGRES:
            return postgresGetUserById(userId);
        default:
            return {
                user: null,
                business_error: "Não foi possível encontrar o usuário especificado",
                route_step_error: "No database server selected"
            };
    }
}

export async function databaseDeleteUserById(userId: string): Promise<DeleteUserResponse> {
    switch(getCurrentDatabase()) {
        case DatabaseEnum.POSTGRES:
            return postgresDeleteUserById(userId);
        default:
            return {
                deleted: false,
                userId: userId,
                business_error: `Não foi possível deltar o usuário ${userId}`,
                route_step_error: "No database server selected"
            };
    }
}