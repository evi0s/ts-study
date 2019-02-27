"use strict";
exports.__esModule = true;
var Koa = require("koa");
var json = require("koa-json");
var logger = require("koa-logger");
var bodyparser = require('koa-bodyparser')();
var index_1 = require("routes/index");
var app = new Koa();
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(index_1.indexRouter.routes(), index_1.indexRouter.allowedMethods());
app.on('error', function (err, ctx) {
    console.error('server error', err, ctx);
});
app.listen(3000);
console.log('Server running on port 3000');
