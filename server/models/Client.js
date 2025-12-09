const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true
  },
  testimonial: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  photoPublicId: {
    type: String // For Cloudinary deletion
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Client', clientSchema);
