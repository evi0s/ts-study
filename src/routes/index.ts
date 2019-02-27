import * as Router from 'koa-router';


const indexRouter = new Router();

indexRouter.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

export { indexRouter };
