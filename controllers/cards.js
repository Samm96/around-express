const Card = require('../models/card');
const { INVALID_DATA_ERROR, NOT_FOUND_ERROR, INT_SERVER_ERROR } = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(INT_SERVER_ERROR).send({ message: 'An error has occurred with the server' });
    });
};

const createCard = (req, res) => {
  console.log(req.user._id); // _id will become accessible (this is hardcoded)
  // Project: "We've hardcoded the user ID, so the card will have the same author in the database
  // regardless of who actually created it."

  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_ERROR).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else {
        res.status(INT_SERVER_ERROR).send({ message: 'An error has occurred with the server' });
      }
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => Card.deleteOne(card))
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(INT_SERVER_ERROR).send({ message: 'An error has occurred with the server' }));
};

const likeCard = (req, res) => {
  const { id } = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: id } },
    { new: true },
  );
};

const dislikeCard = (req, res) => {
  const { id } = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: id } },
    { new: true },
  );
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
