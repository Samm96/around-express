const router = require('express').Router();

const { getUser, getUsers } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUser);