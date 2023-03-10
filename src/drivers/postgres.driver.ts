import { Pool } from "pg";
import { CreateUserResponse, DeleteUserResponse, GetUserByIdResponse, UserDTO, UserEntity, UserListResponse } from "../domain/dtos/user.domain";

let pool: Pool | null = null;

async function initPostgressDriver(): Promise<void> {
    pool = new Pool({
        user: 'brenodb',
        host: 'localhost',
        database: 'test',
        port: 2201,
        password: 'mysecretpasword',
        connectionTimeoutMillis: 300,
        statement_timeout: 300
    });
}

async function checkConnection(): Promise<void> {
    if(pool == null) {
        await initPostgressDriver();
    }
}



export async function postgresListUsers(): Promise<UserListResponse> {
    const response: UserDTO[] = [];
    try {
        await checkConnection();
        const result = await pool!.query('SELECT * FROM USUARIO');
        result.rows.forEach((value: UserEntity) => {
            response.push({
                username: value.username,
                firstname: value.name,
                surename: value.last_name,
                age: value.age
            });
        });
        return {
            data: response,
            business_error: null,
            route_step_error: null
        };
    } catch(error) {
        return {
            data: null,
            business_error: "erro ao listar usuários",
            route_step_error: error
        }
    }
}

export function isConnected(): boolean {
    return pool != null;
}

export async function postgresCreateUser(user: UserDTO): Promise<CreateUserResponse> {
    const response: CreateUserResponse = {
        success: false,
        error: undefined
    };
    try {
        await checkConnection();
        const queryText: string = "insert into usuario (username, name, last_name, age) values ($1, $2, $3, $4) returning *";
        const queryParams: string[] = [user.username, user.firstname, user.surename, user.age.toString()];
        const result = await pool!.query(queryText, queryParams);
        response.success = true;
        response.error = undefined;
    } catch (error) {
        response.success = false;
        response.error = `${error}`;
    }
    return response;
}

export async function postgresGetUserById(userId: string): Promise<GetUserByIdResponse> {
    try {
        await checkConnection();
        const response = await pool!.query("SELECT * FROM USUARIO WHERE ID = $1", [userId]);
        if(response.rowCount < 1) {
            return {
                user: null,
                business_error: "Usuário não encontrado",
                route_step_error: "User not found"
            };
        }
        const responseData = response.rows[0];
        const result: UserDTO = {
            username: "",
            firstname: "",
            surename: "",
            age: 0
        };
        result.username = responseData.username;
        result.firstname = responseData.name;
        result.surename = responseData.last_name;
        result.age = responseData.age;
        return {
            user: result,
            business_error: undefined,
            route_step_error: undefined
        };
    } catch (error) {
        return {
            user: null,
            business_error: "Não foi possível encontrar o usuário especificado",
            route_step_error: JSON.stringify(error)
        };
    }
}

export async function postgresDeleteUserById(userId: string): Promise<DeleteUserResponse> {
    try {
        const queryText = "delete from usuario where id = $1";
        const queryParams = [userId];
        await checkConnection();
        await pool!.query(queryText, queryParams);
        return {
            userId: userId,
            deleted: true,
            business_error: undefined,
            route_step_error: undefined
        }
    } catch (error) {
        return {
            userId: userId,
            deleted: false,
            business_error: `Não foi possível deletar o usuário ${userId}`,
            route_step_error: JSON.stringify(error)
        };
    }
}