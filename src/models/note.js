const { Schema, model } = require('mongoose');

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

/* eslint-disable */
NoteSchema.virtual('date').get(function () {
  const note = this;
  const date = new Date(note.createdAt);
  return date.toDateString();
});

module.exports = model('Note', NoteSchema);
