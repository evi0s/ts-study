import * as Koa from 'koa';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as bodyparser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';

import { debug } from './tools/debug';

const onerror = require('koa-onerror');
const session = require('koa-session-redis');

import * as config from './config';

import { indexRouter } from './routes/index'


const app = new Koa();

onerror(app);

app.use(bodyparser());
app.use(json());
app.use(helmet());
app.use(logger());

app.keys = config.sesskey;
debug(config);
app.use(
    session({
        store: {
            host: config.redishost,
            port: config.redisport,
            ttl: 3600,
        },
        key: 'SESSIONID',
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
