const express = require('express');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
