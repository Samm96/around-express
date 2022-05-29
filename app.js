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

// here down doesn't work properly

app.get('/users/:id', (req, res) => {
  const { name, about, avatar, _id } = req.params;

  if (!users[_id]) {
    res.send({"message": "User ID not found"});
    return;
  }

  res.send(users[_id]);
})
