import * as Router from 'koa-router';
import { passport } from '../controller/passport'


const indexRouter = new Router();

indexRouter.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

indexRouter.get('/test', async (ctx) => {
    console.log(ctx.request.query);
    ctx.body = await passport.login("test", "asd");
});

indexRouter.post('/login', async (ctx) => {
    let username = ctx.request.body.username || '';
    let password = ctx.request.body.password || '';

    console.log(ctx.request.body);
    ctx.body = ctx.request.body;
});

indexRouter.get('/session', async (ctx) => {
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
});

export { indexRouter }
