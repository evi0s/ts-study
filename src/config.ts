/*
 * Project config
 */

let env = process.env;

let databasehost = env.DATABASE_HOST || 'localhost';
let databaseport = env.DATABASE_PORT ||  27017;
let databaseuser = env.DATABASE_USER || 'root';
let databasepass = env.DATABASE_PASS || 'root';
let redishost    = env.REDIS_HOST    || 'localhost';
let redisport    = env.REDIS_PORT    ||  6379;
let sessmaxage   = env.SESS_MAXAGE   ||  86400000;
let passwordsalt = env.PASSWORD_SALT || 'test';

let sesskey: Array<string> = ['test'];
if ( env.SESS_KEY ) {
    sesskey = [ env.SESS_KEY ]
}


export {
    databasehost,
    databaseport,
    databaseuser,
    databasepass,
    redishost,
    redisport,
    sessmaxage,
    sesskey,
    passwordsalt
}
