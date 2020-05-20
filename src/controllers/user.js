/* eslint-disable consistent-return */
const { validationResult } = require('express-validator/check');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { User } = require('../models');

// eslint-disable-next-line import/prefer-default-export
module.exports = {
  signup: async (req, res, next) => {
    try {
      const fields = _.pick(req.body, ['email', 'username', 'password']);
      const validatorErrors = validationResult(req);
      if (!validatorErrors.isEmpty()) {
        const errors = validatorErrors
          .array()
          .map((error) => ({ [error.param]: error.msg }));
        return res.status(400).json({ errors });
      }
      const user = new User(fields);
      user.setPassword(fields.password);
      await user.save();

      const payload = {
        _id: user.id,
        username: user.username,
      };

      const token = jwt.sign(payload, process.env.JWT_KEY);
      return res.json({
        user: { email: fields.email, ...payload },
        token,
      });
    } catch (error) {
      return next(error);
    }
  },

  googleSignup: async (req, res, next) => {
    try {
      const { user } = req;
      const payload = {
        _id: user.id,
        username: user.username,
      };

      const token = jwt.sign(payload, process.env.JWT_KEY);
      return res.json({
        user,
        token,
      });
    } catch (error) {
      return next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const validatorErrors = validationResult(req);

      if (!validatorErrors.isEmpty()) {
        const errors = validatorErrors
          .array()
          .map((error) => ({ [error.param]: error.msg }));
        return res.status(400).json({ errors });
      }
      passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(400).json({ info });
        }

        const payload = {
          _id: user.id,
          username: user.username,
        };

        const token = jwt.sign(payload, process.env.JWT_KEY);
        return res.json({
          user: { email: user.email, ...payload },
          token,
        });
      })(req, res, next);
    } catch (error) {
      return next(error);
    }
  },

  findAll: async (req, res, next) => {
    // const { limit, offset } = req.query;
    try {
      // if (limit && offset) {
      const users = await User.find(
        {},
        {
          username: 1,
          createdAt: 1,
        },
      ).sort('-createdAt');
      return res.json({ users });
      // }
    } catch (error) {
      return next(error);
    }
  },

  findOne: async (req, res, next) => {
    const { id: _id } = req.user;
    try {
      const user = await User.findOne({ _id });
      if (!user) {
        return res.status(404).json({ message: 'User was not found' });
      }
      return res.json({ user });
    } catch (error) {
      return next(error);
    }
  },

  updateOne: async (req, res, next) => {
    const fields = _.pick(req.body, ['username', 'email']);
    const validatorErrors = validationResult(req);
    if (!validatorErrors.isEmpty()) {
      const errors = validatorErrors
        .array()
        .map((error) => ({ [error.param]: error.msg }));
      return res.status(400).json({ errors });
    }
    const { id: _id } = req.user;
    try {
      await User.updateOne({ _id }, fields, {
        runValidators: true,
      });
      return res.json({ message: 'updated successfully' });
    } catch (error) {
      return next(error);
    }
  },
};
