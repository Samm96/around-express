const router = require('express').Router();

const { getUser, getUsers, createUser, updateUser, updateAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/avatar', updateAvatar);

module.exports = router;
