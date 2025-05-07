const { sendErrorResponse } = require('../helpers/send_error_response');
const Author = require('../schemas/Author');
const { authorValidation } = require('../validation/author.validate');


const addAuthor = async (req, res) => {
    try {
        const { error, value } = authorValidation(req.body);
        if (error) {
            return sendErrorResponse(error, res);  
        }

       const newAuthor = await Author.create(value);


        res.status(201).send({ message: "New author added", newAuthor });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).send({ message: authors });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Author.findById(id);
        if (!author) {
            return sendErrorResponse({ message: 'Author not found' }, res);
        }
        res.status(200).send({ message: author });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const updateAuthor = async (req, res) => {
    try {
        const { error, value } = authorValidation(req.body);
        if (error) {
            return sendErrorResponse(error, res);  
        }

        const { id } = req.params;  

        const updatedAuthor = await Author.findByIdAndUpdate(id, value, { new: true });

        if (!updatedAuthor) {
            return sendErrorResponse({ message: 'Author not found' }, res);
        }

        res.status(200).send({ message: "Author updated", updatedAuthor });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAuthor = await Author.findByIdAndDelete(id);
        if (!deletedAuthor) {
            return sendErrorResponse({ message: 'Author not found' }, res);
        }

        res.status(200).send({ message: "Author deleted", deletedAuthor });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

module.exports = {
    addAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
};
