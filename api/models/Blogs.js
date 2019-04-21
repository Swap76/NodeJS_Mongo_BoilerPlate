var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema ({
    // Model
}, {
    timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);