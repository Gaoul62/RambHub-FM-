const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = new mongoose.Schema({
    _id: ObjectId,
    user: { type: ObjectId, required: true },
    name: { type: String, required: true },
});

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;