const express = require('express')
const router = express.Router()

const  {
    getTransactions,
    getTransaction,
    getTransactionsByUser,
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionsController.js')

router.get('/', getTransactions)

router.get('/:transactionID', getTransaction)

router.get('/users/:userID', getTransactionsByUser)

router.post('/', createTransaction)

router.put('/:transactionID', updateTransaction)

router.delete('/:transactionID', deleteTransaction)

module.exports = router