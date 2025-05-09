const express = require('express');
const router = express.Router();
const { addAuthor, loginAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor } = require('../controllers/author.controller');

router.post('/', addAuthor);  
router.post('/login', loginAuthor);  
router.get('/', getAllAuthors);  
router.get('/:id', getAuthorById);  
router.put('/:id', updateAuthor);  
router.delete('/:id', deleteAuthor); 

module.exports = router;
