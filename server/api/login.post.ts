import bcrypt from 'bcrypt';
import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { TokenServiceImpl } from '../services/impl/token.service';
import { UserServiceImpl } from '../services/impl/user.service';
import type { TokenService } from '../services/token.service';
import type { UserService } from '../services/user.service';

const userService: UserService = new UserServiceImpl();
const tokenService: TokenService = new TokenServiceImpl();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Check data
    if (!body.email || !body.password) {
        setResponseStatus(event, 400);
        return { error: 'Missing required fields' };
    }

    // Find user
    const user = await userService.getByEmail(body.email);
    if (!user) {
        setResponseStatus(event, 404);
        return { error: 'User not found' };
    }

    const matchPassword = await bcrypt.compare(body.password, user.hashedPassword);
    if (!matchPassword) {
        setResponseStatus(event, 401);
        return { error: 'Not authorized' };
    }

    const token = tokenService.create(body.email);

    return { message: 'Login successful', token: token, user: { firstName: user.firstName, lastName: user.lastName, email: user.email } };
});