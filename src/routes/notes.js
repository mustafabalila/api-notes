const { Router } = require('express');
const passport = require('passport');
const {
  create,
  findAll,
  findOne,
  updateOne,
  deleteOne,
} = require('../controllers/note');

const router = Router();

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), findAll)
  .post(passport.authenticate('jwt', { session: false }), create);

router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), findOne)
  .put(passport.authenticate('jwt', { session: false }), updateOne)
  .delete(passport.authenticate('jwt', { session: false }), deleteOne);

module.exports = router;
