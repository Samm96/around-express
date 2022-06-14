const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(JSON.parse(cards));
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred with the server' });
    });
};

const createCard = (req, res) => {
  const owner = req.user._id;
  console.log(req.user._id); // _id will become accessible (this is hardcoded)
  //Project: "We've hardcoded the user ID, so the card will have the same author in the database regardless of who actually created it."

  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'An error has occurred with the server' })); // placeholder
};

const deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => Card.deleteOne(card))
    .then(() => res.send({ data: card}))
    .catch(() => res.status(500).send({ message: 'An error has occurred with the server' })); // placeholder
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
