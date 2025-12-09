const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  imagePublicId: {
    type: String // For Cloudinary deletion
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
