
const Wallet = require('../collections/wallets');
const mongoose = require('mongoose');

const getWallets = async (req, res) => {
    Wallet.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({ msg: error }));
};

const getWallet = (req, res) => {
    Wallet.findOne({ _id: req.params.walletID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({ msg: 'Wallet not found' }));
};

const getWalletsByUser = (req, res) => {
    Wallet.find({ user: req.params.userID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({ msg: 'Wallet not found' }));
};

const createWallet = async (req, res) => {
    try {
        const { user, name, balance, currency } = req.body;
        const newWallet = new Wallet({
            _id: new mongoose.Types.ObjectId(),
            user,
            name,
            balance,
            currency
        });

        const result = await newWallet.save();
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the wallet' });
    }
};

const updateWallet = async (req, res) => {
    try {
        const { name, balance, currency } = req.body;
        const existingWallet = await Wallet.findOne({ _id: req.params.walletID });

        if (!existingWallet) {
            return res.status(404).json({ msg: 'Wallet not found' });
        }

        existingWallet.name = name;
        existingWallet.balance = balance;
        existingWallet.currency = currency;

        const result = await existingWallet.save();
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while updating the wallet' });
    }
};

const deleteWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ _id: req.params.walletID });

        if (!wallet) {
            return res.status(404).json({ msg: 'Wallet not found' });
        }

        const result = await Wallet.deleteOne({ _id: req.params.walletID });
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while deleting the wallet' });
    }
};

module.exports = {
    getWallets,
    getWallet,
    getWalletsByUser,
    createWallet,
    updateWallet,
    deleteWallet
};