const Card = require('../models/card');
const { INVALID_DATA_ERROR, NOT_FOUND_ERROR, INT_SERVER_ERROR } = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(JSON.parse(cards));
    })
    .catch(() => {
      res.status(INT_SERVER_ERROR).send({ message: 'An error has occurred with the server' });
    });
};

const createCard = (req, res) => {
  const owner = req.user._id;
  console.log(req.user._id); // _id will become accessible (this is hardcoded)
  //Project: "We've hardcoded the user ID, so the card will have the same author in the database regardless of who actually created it."

  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {

      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_ERROR).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}`});
      } else {
        res.status(INT_SERVER_ERROR).send({ message: 'An error has occurred with the server' });
      }
      });
};

const deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findById(id)
    .orFail(() => {
      const error = new Error('Card ID not found');
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((card) => Card.deleteOne(card))
    .then(() => res.send({ data: card}))
    .catch(() => res.status(INT_SERVER_ERROR).send({ message: 'An error has occurred with the server' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
