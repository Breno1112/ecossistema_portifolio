import { UserDTO } from "../domain/dtos/user.dto";

export async function listUsers(): Promise<UserDTO[]> {
    return [
        {
            username: "Breno1112",
            firstname: "Breno",
            surename: "Fachini",
            age: 21
        }
    ];
}