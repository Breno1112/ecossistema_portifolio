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

export type DeleteUserResponseDTO = {
    userId: string;
    deleted: boolean;
    error: string | undefined;
}

export type GetUserByIdResponse = {
    user: UserDTO | null;
    business_error: string | undefined;
    route_step_error: string | undefined;
}

export type DeleteUserResponse = {
    userId: string;
    deleted: boolean;
    business_error: string | undefined;
    route_step_error: string | undefined;
}

export type UserEntity = { username: string;
    name: string;
    last_name: string;
    age: number;
}