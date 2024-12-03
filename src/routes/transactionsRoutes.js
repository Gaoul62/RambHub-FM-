const express = require('express')
const router = express.Router()

const  {
    getTransactions,
    getTransaction,
    getTransactionsByUser,
    getTransactionsByWallet,
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionsController.js')

router.get('/', getTransactions)

router.get('/:transactionID', getTransaction)

router.get('/users/:userID', getTransactionsByUser)

router.get('/wallets/:walletID', getTransactionsByWallet)

router.post('/', createTransaction)

router.put('/:transactionID', updateTransaction)

router.delete('/:transactionID', deleteTransaction)

module.exports = router