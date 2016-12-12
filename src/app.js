import Koa from 'koa';
import logger from 'koa-logger';
import auth from 'koa-basic-auth';
import _ from 'koa-route';

import * as docker from './docker';
import config from './config';

const app = new Koa();

app.use(logger());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'need authenticate';
    } else {
      throw err;
    }
  }
});
app.use(auth({ name: config.name, pass: config.pass }));

app.use(_.get('/search_by_name/:name', docker.getByName));
app.use(_.get('/search_by_id/:id', docker.getById));
app.use(_.get('/all', docker.getAll));

app.listen(8000);
