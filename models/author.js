const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema, model } = mongoose;

// Author Schema
const authorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  journals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Journal',
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Password-related instance methods
authorSchema.methods.setPassword = async function (newPassword) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(newPassword, salt);
};

authorSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('Author', authorSchema);
