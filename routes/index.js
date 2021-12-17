const { Router } = require('express')
const userRouter = require('./User')
const frisbeeRouter = require('./FrisbeeRoute')
const authRouter = require('./Authenticate')
const logRouter = require('./Log')

const routes = Router();

routes.use('/users', userRouter);
routes.use('/auth', authRouter);
routes.use('/log', logRouter);
routes.use('/frisbee', frisbeeRouter);

module.exports = routes;
