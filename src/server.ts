import * as Koa from 'koa';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as bodyparser from 'koa-bodyparser';

const onerror = require('koa-onerror');
const session = require('koa-session-redis');

import * as config from './config';

import { indexRouter } from './routes/index'


const app = new Koa();

onerror(app);

app.use(bodyparser());
app.use(json());
app.use(logger());

app.keys = config.sesskey;
console.log(config);
app.use(
    session({
        store: {
            host: config.redishost,
            port: config.redisport,
            ttl: 3600,
        },
        maxAge: config.sessmaxage,
        httpOnly: true
    })
);

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

