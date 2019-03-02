import * as Router from 'koa-router';
import { Passport } from '../controller/passport'
import { debug } from '../tools/debug';
import { successResponse } from "../model/successResponse";
import { errorResponse } from "../model/errorResponse";
import * as xss from 'xss';

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
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    debug(ctx.request.body);
    let result: object;
    let error: any = null;
    try {
        result = await passport.login(username, password);
    } catch (err) {
        debug(err);
        error = err;
    }

    if (error) {
        let errorRawRes = new errorResponse(
            422,
            'Login Failed!',
            error.message
        ).toString();
        let errorRes = xss(errorRawRes);
        ctx.body = errorRes;
        return;
    }

    debug(result);
    let successRawRes = new successResponse(
        200,
        'OK',
        result).toString();
    let successRes = xss(successRawRes);
    ctx.session.username = result;
    ctx.body = successRes;
});

indexRouter.post('/register', async (ctx) => {
    let username    = ctx.request.body.username;
    let password    = ctx.request.body.password;
    let confirmpass = ctx.request.body.confirmpass;
    let email       = ctx.request.body.email;
    let nickname    = ctx.request.body.nickname || username;

    debug(ctx.request.body);

    if (password != confirmpass) {
        let errorRawRes = new errorResponse(
            422,
            'Register Failed!',
            'Confirm Pass Not Same!'
        ).toString();
        let errorRes = xss(errorRawRes);
        ctx.status = 422;
        ctx.body = errorRes;
        return;
    }

    let result: object;
    let error: any = null;
    try {
        result = await passport.register(username, password,
            email, nickname);
    } catch (err) {
        debug(err);
        error = err;
    }

    if (error) {
        let errorRawRes = new errorResponse(
            422,
            'Register Failed!',
            error.message
        ).toString();
        let errorRes = xss(errorRawRes);
        ctx.status = 422;
        ctx.body = errorRes;
        return;
    }

    debug(result);
    let successRawRes = new successResponse(
        200,
        'OK',
        result).toString();
    let successRes = xss(successRawRes);
    ctx.body = successRes;
});

indexRouter.get('/status', async (ctx) => {
   if (!ctx.session.username) {
       let errorRawRes = new errorResponse(
           422,
           'Not Login!',
           'Not Login!'
       ).toString();
       let errorRes = xss(errorRawRes);
       ctx.body = errorRes;
       return;
   }

   let successRawRes = new successResponse(
       200,
       'OK',
       ctx.session.username).toString();
   let successRes = xss(successRawRes);
   ctx.body = successRes;
});

indexRouter.get('/session', async (ctx) => {
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
});

export { indexRouter }
