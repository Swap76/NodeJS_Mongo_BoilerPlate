var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema ({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    text: true,
    maxlength: 256,
  },
  content: {
    type: String,
    required: true,
    text: true,
    maxlength: 65536,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);