const express = require('express');
const path = require('path');
const usersRouter = require('./routes/usersRouter');
const cardsRouter = require('./routes/cardsRouter');
const notFoundRouter = require('./routes/notFoundRoutes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', notFoundRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение слушает порт ${PORT}`);
});
