const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(JSON.parse(users));
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred with the server' });
    });
};

const getUser = (req, res) => {
  // the specific variable specified in the get request (the ID of the URL)
  const { id } = req.params;
  User.findById(id)
    .then((users) => {
      // turn that data into a JavaScript object
      const parsedUserData = JSON.parse(users);
      // find the id that has been requested in the JavaScript object
      const user = parsedUserData.find(({ _id: userId }) => userId === id);

      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.send({ data: user });
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred with the server' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'An error occurred while creating user' }));
};

module.exports = {
  getUser,
  getUsers,
  createUser,
};
