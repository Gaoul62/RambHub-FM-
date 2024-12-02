const express = require('express')
const router = express.Router()

const {
    getCategories,
    getCategory,
    getCategoriesByUser,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoriesController.js')

router.get('/', getCategories)

router.get('/:categoryID', getCategory)

router.get('/users/:userID', getCategoriesByUser)

router.post('/', createCategory)

router.put('/:categoryID', updateCategory)

router.delete('/:categoryID', deleteCategory)

module.exports = router
