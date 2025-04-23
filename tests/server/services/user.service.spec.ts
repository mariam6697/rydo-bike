import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { UserModel } from '../../../server/db/models/users.models';
import { UserServiceImpl } from '../../../server/services/impl/user.service';

describe('UserServiceImpl', () => {
    let userService: UserServiceImpl;
    let mongoServer: MongoMemoryServer;

    beforeEach(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        userService = new UserServiceImpl();
    });

    afterEach(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should successfully save a new user', async () => {
        const userData = {
            firstName: 'Name',
            lastName: 'Lastname',
            email: 'namelastname@example.com',
            password: '123456789',
        };

        await userService.save(userData.firstName, userData.lastName, userData.email, userData.password);

        const savedUser = await UserModel.findOne({ email: userData.email });
        expect(savedUser).toBeDefined();
        expect(savedUser?.firstName).toBe(userData.firstName);
        expect(savedUser?.lastName).toBe(userData.lastName);
        expect(savedUser?.email).toBe(userData.email);
        expect(savedUser?.hashedPassword).not.toBe(userData.password); 
    });
});