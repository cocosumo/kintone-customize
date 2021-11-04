import env from './env.json';

export const AUTH = env.token;
export const DOMAIN = env.domain;
export const NODE_ENV = process.env.NODE_ENV;
export const IS_PRODUCTION = NODE_ENV === 'production';