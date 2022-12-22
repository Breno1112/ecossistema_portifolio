import { Pool } from "pg";
import { UserDTO, UserListResponse } from "../domain/dtos/user/user.domain";

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



export async function postgresListUsers(): Promise<UserListResponse> {
    const response: UserDTO[] = [];
    try {
        if(pool == null) {
            await initPostgressDriver();
        }
        const result = await pool!.query('SELECT * FROM USUARIO');
        result.rows.forEach((value) => {
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