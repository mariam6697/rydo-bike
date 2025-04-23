const config = useRuntimeConfig();

export const SALT_ROUNDS = 10;

export const JWT_SECRET = config.JWT_SECRET;

export const TOKEN_EXPIRES_IN = '12h';