const Transaction = require('../collections/transactions');
const mongoose = require('mongoose');
const encryptionHelper = require('../helpers/encryptionHelper');

const getTransactions = async (req, res) => {
    Transaction.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
};

const getTransaction = ((req, res) => {
    Transaction.findOne({ _id: req.params.transactionID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Transaction not found'}))
});

const getTransactionsByUser = ((req, res) => {
    Transaction.find({ user: req.params.projectID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Transaction not found'}))
});

const getTransactionsByWallet = ((req, res) => {
    Transaction.find({ wallet: req.params.walletID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Transaction not found'}))
});

const createTransaction = async (req, res) => {
    try {
        const { user, wallet, name, date, category, type, amount } = req.body;
        const newTransaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            user,
            wallet,
            name,
            date,
            category,
            type,
            amount
        });

        const result = await newTransaction.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the transaction' });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const { user, wallet, name, date, category, type, amount } = req.body;
        const existingTransaction = await Transaction.findOne({ _id: req.params.transactionID });

        if (!existingTransaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }

        existingTransaction.user = user;
        existingTransaction.wallet = wallet;
        existingTransaction.name = name;
        existingTransaction.date = date;
        existingTransaction.category = category;
        existingTransaction.type = type;
        existingTransaction.amount = amount;

        const result = await existingTransaction.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while updating the transaction' });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.transactionID });

        if (!transaction) {
            return res.status(404).json({msg: 'Transaction not found'});
        }

        const result = await Transaction.deleteOne({ _id: req.params.transactionID });
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while deleting the transaction' });
    }
};

module.exports = {
    getTransactions,
    getTransaction,
    getTransactionsByUser,
    getTransactionsByWallet,
    createTransaction,
    updateTransaction,
    deleteTransaction
};