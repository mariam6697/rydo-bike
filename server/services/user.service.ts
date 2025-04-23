import type { IUser } from "../db/models/users.models";

export abstract class UserService {
    abstract save(firstName: string, lastName: string, email: string, password: string): Promise<void>;

    abstract getByEmail(email: string): Promise<IUser | null>;
}