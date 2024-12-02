
const express = require('express');
const router = express.Router();

const {
    getWallets,
    getWallet,
    getWalletsByUser,
    createWallet,
    updateWallet,
    deleteWallet
} = require('../controllers/walletsController.js');

router.get('/', getWallets);

router.get('/:walletID', getWallet);

router.get('/users/:userID', getWalletsByUser);

router.post('/', createWallet);

router.put('/:walletID', updateWallet);

router.delete('/:walletID', deleteWallet);

module.exports = router;