const express = require('express');
const { PORT = 3000 } = process.env;

const users = require('./users');
const cards = require('./cards');

const app = express();

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})

app.get('/users', (req, res) =>{
  res.send(users);
})

app.get('/cards', (req, res) => {
  res.send(cards);
})

app.get('/users/:id', (req, res) => {

  if (!users[req.params.id]) {
    res.send({"message": "User ID not found"});
    return;
  }

  res.send(users[req.params.id]);
})

app.get('*', (req, res) => {
  res.status(404).send({"message": "Requested resource not found"});
})