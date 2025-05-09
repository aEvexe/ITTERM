const { sendErrorResponse } = require('../helpers/send_error_response');
const Author = require('../schemas/Author');
const { authorValidation } = require('../validation/author.validate');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('config');

const addAuthor = async (req, res) => {
    try {
        const { error, value } = authorValidation(req.body);
        if (error) {
            return sendErrorResponse(error, res);  
        }

        const hashedPassword = bcrypt.hashSync(value.password, 7)

        const newAuthor = await Author.create({...value, password: hashedPassword});

        res.status(201).send({ message: "New author added", newAuthor });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const getAllAuthors = async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        console.log(authorization)

        if (!authorization){
            return res.status(401).send({message: "authorized not found"})
        }

        const bearer = authorization.split(" ")[0]
        const token = authorization.split(" ")[1]

        if(bearer !== "Bearer" || !token){
            return res.status(401).send({message: "bearer not found"})
        }

        const decodedPayload = jwt.verify(token, config.get("tokenKey"));
        console.log(decodedPayload)

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

const loginAuthor  = async (req, res) => {
    try {
        const { email, password } = req.body
        const author = await Author.findOne({ email });
        if (!author) {
            return res.status(401).send({message: "email or password is incorrect"})
        }

        const validPassword = bcrypt.compareSync(password, author.password);
        if (!validPassword){
            return res.status(401).send({message: "email or password is incorrect"})
        }

        const payload = {
            id: author._id,
            email: author._email,
            is_active: author.is_active,
            is_expert: author.is_expert
        }

        const token = jwt.sign(payload, config.get("tokenKey"), {
            expiresIn: config.get("tokenExpTime")
        })

        res.status(201).send({ message: "You entered, Welcome", id: author.id, token });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

module.exports = {
    addAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
    loginAuthor
};
