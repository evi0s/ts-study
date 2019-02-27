import * as Koa from 'koa';
import * as json from 'koa-json';
import * as logger from 'koa-logger';

const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();

import { indexRouter } from './routes/index'

const app = new Koa();

onerror(app);

app.use(bodyparser);
app.use(json());
app.use(logger());

app.use(indexRouter.routes());

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

app.listen(3000);

console.log('Server running on port 3000');
