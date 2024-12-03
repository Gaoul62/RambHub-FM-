const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const walletSchema = new mongoose.Schema({
    _id: ObjectId,
    user: { type: ObjectId, required: true },
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    currency: { type: String, required: true },
});

const Wallet = mongoose.model('wallets', walletSchema);

module.exports = Wallet;