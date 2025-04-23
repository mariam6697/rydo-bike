import type { Document } from 'mongoose';
import { model, Schema } from 'mongoose';

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    hashedPassword: string;
}

interface User extends Document, IUser {
    createdAt: Date;
}

const UserSchema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    hashedPassword: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const UserModel = model<User>('User', UserSchema);

export { IUser, User, UserModel };
