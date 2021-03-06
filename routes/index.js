const { Router } = require('express')
const userRouter = require('./UserRoute')
const frisbeeRouter = require('./FrisbeeRoute')
const fabricationProcessRouter = require('./FabricationProcessRoute')
const ingredientRouter = require('./IngredientRoute')
const authRouter = require('./AuthenticateRoute')
const logRouter = require('./LogRoute')

const routes = Router();

routes.use('/users', userRouter);
routes.use('/auth', authRouter);
routes.use('/log', logRouter);
routes.use('/frisbee', frisbeeRouter);
routes.use('/ingredient', ingredientRouter);
routes.use('/fabricationProcess', fabricationProcessRouter);

module.exports = routes;
