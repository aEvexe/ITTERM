const express = require('express');
const router = express.Router();
const { addAuthor, loginAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor, logout } = require('../controllers/author.controller');
const authorJwtGuard = require('../middleware/guards/author-jwt.guard');
const authorSelfGuard = require('../middleware/guards/author-self.guard');

router.post('/add', addAuthor);  
router.post('/log', loginAuthor);  
router.get('/logout', logout);  
router.get('/all', getAllAuthors);  
router.get('/:id', authorJwtGuard, authorSelfGuard, getAuthorById);  
router.put('/:id', updateAuthor);  
router.delete('/:id', deleteAuthor); 

module.exports = router;
