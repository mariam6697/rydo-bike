import bcrypt from 'bcrypt';
import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, TOKEN_EXPIRES_IN } from '../constants/auth';
import { UserModel } from '../db/models/users.models';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Check data
    if (!body.email || !body.password) {
        setResponseStatus(event, 400);
        return { error: 'Missing required fields' };
    }

    // Find user
    const user = await UserModel.findOne({ email: body.email });
    if (!user) {
        setResponseStatus(event, 404);
        return { error: 'User not found' };
    }

    const matchPassword = await bcrypt.compare(body.password, user.hashedPassword);
    if (!matchPassword) {
        setResponseStatus(event, 401);
        return { error: 'Not authorized' };
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

    return { message: 'Login successful', token: token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } };
});