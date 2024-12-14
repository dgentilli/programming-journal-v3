const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Journal Schema
const journalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200, // Limit title length
    },
    content: {
      type: String,
      required: true,
      maxlength: 10000, // Limit content length
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: 30, // Limit tag length
      },
    ],
    category: {
      type: String,
      default: 'Other',
    },
    searchMetadata: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search functionality
journalSchema.index({
  title: 'text',
  content: 'text',
  tags: 'text',
  searchMetadata: 'text',
});

// Pre-save hook to update search metadata
journalSchema.pre('save', function (next) {
  // Combine relevant fields for searchable metadata
  this.searchMetadata = `${this.title} ${this.content} ${this.tags.join(
    ' '
  )}`.toLowerCase();
  next();
});

module.exports = model('Journal', journalSchema);
