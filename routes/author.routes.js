const express = require('express');
const router = express.Router();
const { addAuthor, loginAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor } = require('../controllers/author.controller');
const authorJwtGuard = require('../middleware/guards/author-jwt.guard');
const authorSelfGuard = require('../middleware/guards/author-self.guard');

router.post('/', addAuthor);  
router.post('/login', loginAuthor);  
router.get('/', authorJwtGuard, getAllAuthors);  
router.get('/:id', authorJwtGuard, authorSelfGuard, getAuthorById);  
router.put('/:id', updateAuthor);  
router.delete('/:id', deleteAuthor); 

module.exports = router;
