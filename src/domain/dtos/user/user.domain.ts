export type UserDTO = {
    username: string;
    firstname: string;
    surename: string;
    age: number;
}

export type UserListResponse = {
    data: UserDTO[] | null;
    business_error: string | null;
    route_step_error: any | null;
}

export type CreateUserResponse = {
    success: boolean;
    error: string | undefined;
}