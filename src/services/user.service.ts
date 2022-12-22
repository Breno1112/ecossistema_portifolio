import { UserDTO } from "../domain/dtos/user.dto";
import { postgresListUsers } from "../drivers/postgres.driver";

export async function listUsers(): Promise<UserDTO[]> {
    return await postgresListUsers();
}