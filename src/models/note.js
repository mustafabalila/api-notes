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

    isStarred: {
      type: Boolean,
      default: false,
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

NoteSchema.index({ title: 'text' });

module.exports = model('Note', NoteSchema);
