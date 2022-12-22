import { Pool, Client } from "pg";
import { UserDTO } from "../domain/dtos/user.dto";

let pool: Pool | null = null;

async function initPostgressDriver(): Promise<void> {
    pool = new Pool({
        user: 'brenodb',
        host: 'localhost',
        database: 'test',
        port: 2201,
        password: 'mysecretpasword',
        connectionTimeoutMillis: 5000
    });
}



export async function postgresListUsers(): Promise<UserDTO[]> {
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
    } catch(error) {
        console.log(error);
    }
    return response;
}