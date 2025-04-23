import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '~/server/constants/auth';
import type { IUser } from "~/server/db/models/users.models";
import { UserModel } from "~/server/db/models/users.models";
import type { UserService } from "../user.service";

export class UserServiceImpl implements UserService {
    async save(firstName: string, lastName: string, email: string, password: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            hashedPassword
        });
        await newUser.save();

    }

    async getByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return null; 
        }

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            hashedPassword: user.hashedPassword,
        };
    }
}