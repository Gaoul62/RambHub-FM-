const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema({
    _id: ObjectId,
    user: { type: Object, required: true },
    wallet: { type: Object, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
});

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;