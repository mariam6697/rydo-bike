import bcrypt from 'bcrypt';
import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { SALT_ROUNDS } from '../constants/auth';
import { UserModel } from '../db/models/users.models';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Check data
  if (!body.firstName || !body.lastName || !body.email || !body.password) {
    setResponseStatus(event, 400);
    return { error: 'Missing required fields' };
  }

  // Check uniqueness
  const existingUser = await UserModel.findOne({ email: body.email });
  if (existingUser) {
    setResponseStatus(event, 400);
    return { error: 'Mail already registered' };
  }

  const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);
  const newUser = new UserModel({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    hashedPassword: hashedPassword
  });
  await newUser.save();

  return { message: `User ${body.mail} successfully signed up`, user: { id: newUser.id } };
});