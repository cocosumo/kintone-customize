import env from './env.json';
export var AUTH = env.token;
export var DOMAIN = env.domain;
export var NODE_ENV = process.env.NODE_ENV;
export var IS_PRODUCTION = NODE_ENV === 'production';
