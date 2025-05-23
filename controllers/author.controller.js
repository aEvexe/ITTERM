const { sendErrorResponse } = require('../helpers/send_error_response');
const Author = require('../schemas/Author');
const { authorValidation } = require('../validation/author.validate');
const bcrypt = require('bcrypt');
const { authorJwtService } = require('../service/jwt.service');
const uuid = require('uuid'); 
const { AuthMailServicee } = require('../service/mail.service');
const config = require('config');

const addAuthor = async (req, res) => {
    try {
        const { error, value } = authorValidation(req.body);
        if (error) return sendErrorResponse(error, res);

        const hashedPassword = bcrypt.hashSync(value.password, 7);
        const activationLink = uuid.v4();

        const newAuthor = await Author.create({
            ...value,
            password: hashedPassword,
            activation_link: activationLink
        });

        const link = `${config.get("api_url")}/api/authors/activate/${activationLink}`;
        await AuthMailServicee.Sendmail(value.email, link);

        res.status(201).send({
            message: "New author added",
            author: newAuthor
        });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).send({ authors });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Author.findById(id);
        if (!author) return res.status(404).send({ message: 'Author not found' });

        res.status(200).send({ author });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const updateAuthor = async (req, res) => {
    try {
        const { error, value } = authorValidation(req.body);
        if (error) return sendErrorResponse(error, res);

        const { id } = req.params;
        const updatedAuthor = await Author.findByIdAndUpdate(id, value, { new: true });

        if (!updatedAuthor) return res.status(404).send({ message: 'Author not found' });

        res.status(200).send({
            message: "Author updated",
            author: updatedAuthor
        });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAuthor = await Author.findByIdAndDelete(id);

        if (!deletedAuthor) return res.status(404).send({ message: 'Author not found' });

        res.status(200).send({
            message: "Author deleted",
            author: deletedAuthor
        });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const loginAuthor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const author = await Author.findOne({ email });
        if (!author) return res.status(401).send({ message: "Email or password is incorrect" });

        const validPassword = bcrypt.compareSync(password, author.password);
        if (!validPassword) return res.status(401).send({ message: "Email or password is incorrect" });

        const payload = {
            id: author._id,
            email: author.email,
            is_active: author.is_active,
            is_expert: author.is_expert
        };

        const tokens = authorJwtService.generateTokens(payload);
        author.refresh_token = tokens.refreshToken;
        await author.save();

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: config.get("cookie_refresh_time")
        });

        res.status(200).send({
            message: "You are logged in",
            author: { id: author.id },
            accessToken: tokens.accessToken
        });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) return res.status(400).send({ message: "Refresh token not found in cookies" });

        const author = await Author.findOneAndUpdate(
            { refresh_token: refreshToken },
            { refresh_token: "" },
            { new: true }
        );

        if (!author) return res.status(400).send({ message: "Author not found with this refresh token" });

        res.clearCookie("refreshToken");
        res.send({ message: "Logout successful", author });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const refreshAuthToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) return res.status(400).send({ message: "Refresh token not found in cookies" });

        await authorJwtService.verifyRefreshToken(refreshToken);
        const author = await Author.findOne({ refresh_token: refreshToken });
        if (!author) return res.status(401).send({ message: "Invalid refresh token" });

        const payload = {
            id: author._id,
            email: author.email,
            is_active: author.is_active,
            is_expert: author.is_expert
        };

        const tokens = authorJwtService.generateTokens(payload);
        author.refresh_token = tokens.refreshToken;
        await author.save();

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: config.get("cookie_refresh_time")
        });

        res.status(200).send({
            message: "Tokens refreshed",
            author: { id: author.id },
            accessToken: tokens.accessToken
        });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const authorActivate = async (req, res) => {
    try {
        const { link } = req.params;
        const author = await Author.findOne({ activation_link: link });

        if (!author) return res.status(400).send({ message: "Invalid activation link" });
        if (author.is_active) return res.status(400).send({ message: "Author already activated" });

        author.is_active = true;
        await author.save();

        res.send({ message: "Author activated", isActive: author.is_active });
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
    loginAuthor,
    logout,
    refreshAuthToken,
    authorActivate
};
