const path = require('path');
const fsPromises = require('fs').promises;
const Card = require('../models/cards');

const CARDS_PATH = path.join(__dirname, '../data/cards.json');

const getCards = (req, res) => {
  fsPromises.readFile(CARDS_PATH, { encoding: 'utf8' })
    .then((cards) => {
      res.send(JSON.parse(cards));
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred with the server' });
    });
};

const createCard = (req, res) => {
  const owner = req.user._id;
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
