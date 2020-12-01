const express = require('express');
const path = require('path');
const usersRouter = require('./routes/usersRouter');
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});


