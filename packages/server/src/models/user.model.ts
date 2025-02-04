interface User {
    id: string;
    email: string;
    password_hash: string;
    created_at: Date;
}

export interface UserCreateInput {
    email: string;
    password: string;
}

export interface UserLoginInput {
    email: string;
    password: string;
}

export default User;