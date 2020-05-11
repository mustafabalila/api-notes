const { Router } = require('express');
const users = require('./users');
const notes = require('./notes');

const router = Router();
router.use('/users', users);
router.use('/notes', notes);

module.exports = router;
