const Category = require('../collections/categories');
const mongoose = require('mongoose');

const getCategories = async (req, res) => {
    Category.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({ msg: error }));
};

const getCategory = (req, res) => {
    Category.findOne({ _id: req.params.categoryID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({ msg: 'Category not found' }));
};

const getCategoriesByUser = (req, res) => {
    Category.find({ user: req.params.userID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({ msg: 'Category not found' }));
};

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({
            _id: new mongoose.Types.ObjectId(),
            name,
            description
        });

        const result = await newCategory.save();
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the category' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const existingCategory = await Category.findOne({ _id: req.params.categoryID });

        if (!existingCategory) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        existingCategory.name = name;
        existingCategory.description = description;

        const result = await existingCategory.save();
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while updating the category' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.categoryID });

        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        const result = await Category.deleteOne({ _id: req.params.categoryID });
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while deleting the category' });
    }
};

module.exports = {
    getCategories,
    getCategory,
    getCategoriesByUser,
    createCategory,
    updateCategory,
    deleteCategory
};
