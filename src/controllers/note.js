const _ = require('lodash');
const { Note } = require('../models');

// eslint-disable-next-line import/prefer-default-export
module.exports = {
  create: async (req, res, next) => {
    try {
      const fields = _.pick(req.body, ['body', 'title']);
      const note = new Note(fields);
      note.user = req.user.id;
      await note.save();
      return res.json({ message: 'note was created', error: false });
    } catch (error) {
      return next(error);
    }
  },

  findAll: async (req, res, next) => {
    const { isStarred, title } = req.query;
    const { user } = req;
    const query = { user: user.id };
    try {
      if (isStarred) {
        query.isStarred = true;
      }
      if (title) {
        query.$text = {
          $search: title,
        };
      }
      const notes = await Note.find(query, { body: 0 });
      return res.json({ notes });
    } catch (error) {
      return next(error);
    }
  },

  findOne: async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;
    try {
      const note = await Note.findOne({ _id: id, user: user.id });
      return res.json({ note });
    } catch (error) {
      return next(error);
    }
  },

  updateOne: async (req, res, next) => {
    const { id: _id } = req.params;
    const { user } = req;
    const updatedFields = _.pick(req.body, ['title', 'body', 'isStarred']);
    try {
      await Note.updateOne({ _id, user: user.id }, updatedFields, {
        runValidators: true,
      });
      return res.json({ message: 'updated successfully' });
    } catch (error) {
      return next(error);
    }
  },

  deleteOne: async (req, res, next) => {
    const { id } = req.params;
    try {
      await Note.findByIdAndDelete(id);
      return res.json({ message: 'deleted successfully' });
    } catch (error) {
      return next(error);
    }
  },
};
