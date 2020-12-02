const usersRouter = require('express').Router();
const getCards = require('../controllers/cards');

usersRouter.get('/cards', getCards);

module.exports = usersRouter;
