const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// temp authorization solution
app.use((req, res, next) => {
  req.user = {
    _id: '62a7e195f4764aa1f59daf17'
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
