import jwt from 'jsonwebtoken';
import { JWT_SECRET, TOKEN_EXPIRES_IN } from '~/server/constants/auth';
import type { TokenService } from "../token.service";

export class TokenServiceImpl implements TokenService {
     create(email: string): string {
         return jwt.sign({ email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
     }
}