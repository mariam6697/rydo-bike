import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { UserServiceImpl } from '../services/impl/user.service';
import type { UserService } from '../services/user.service';

const userService: UserService = new UserServiceImpl();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Check data
  if (!body.firstName || !body.lastName || !body.email || !body.password) {
    setResponseStatus(event, 400);
    return { error: 'Missing required fields' };
  }

  // Check uniqueness
  const existingUser = await userService.getByEmail(body.email);
  if (existingUser) {
    setResponseStatus(event, 400);
    return { error: 'Mail already registered' };
  }

  await userService.save(body.firstName, body.lastName, body.email, body.password);

  return { message: `User ${body.mail} successfully signed up` };
});