const User = require('../models/user');
const { INVALID_DATA_ERROR, NOT_FOUND_ERROR, INT_SERVER_ERROR } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error('List of users not found');
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(INT_SERVER_ERROR).send({ message: 'An error has occurred with the server' });
    });
};

const getUser = (req, res) => {
  // the specific variable specified in the get request (the ID of the URL)
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      // turn that data into a JavaScript object
      //const parsedUserData = users;
      // find the id that has been requested in the JavaScript object
      //const user = parsedUserData.find(({ _id: userId }) => userId === id);

      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'User ID not found' });
      } else {
        res.send({ data: user });
      }
    })
    .catch(() => {
      res.status(INT_SERVER_ERROR).send({ message: 'An error has occurred with the server' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_ERROR).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}`});
      } else {
        res.status(INT_SERVER_ERROR).send({ message: 'An error occurred while creating user' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      const error = new Error('User ID not found');
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_ERROR).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}`});
      } else {
        res.status(INT_SERVER_ERROR).send({ message: 'An error has occurred with the server' });
      }
    });
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      const error = new Error('User ID not found');
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_ERROR).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else {
        res.status(INT_SERVER_ERROR).send({ message: 'An error has occurred with the server' });
      }
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
};
