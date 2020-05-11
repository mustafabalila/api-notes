const { Router } = require('express');
const passport = require('passport');
const {
  signup,
  login,
  findAll,
  findOne,
  updateOne,
} = require('../controllers/user');
const {
  isUnique,
  loginValidator,
  signupValidator,
  updateValidator,
} = require('../middleware/validator');

const router = Router();

router.get('/', findAll);
router.post('/signup', signupValidator, isUnique, signup);
router.post('/login', loginValidator, login);

router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), findOne)
  .put(
    updateValidator,
    passport.authenticate('jwt', { session: false }),
    updateOne,
  );
module.exports = router;
