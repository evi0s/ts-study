import * as Router from 'koa-router';
import { Passport } from '../controller/passport'
import { debug } from '../tools/debug';
import { successResponse } from "../model/successResponse";
import { errorResponse } from "../model/errorResponse";

const indexRouter = new Router();
const passport = new Passport();

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
    let result;
    try {
        result = await passport.login(username, password);
    } catch (err) {
        throw err;
    }
    debug(result);
    let res = new successResponse(
        200,
        'OK',
        result).toString();
    ctx.body = res;
});

indexRouter.get('/session', async (ctx) => {
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
});

export { indexRouter }
