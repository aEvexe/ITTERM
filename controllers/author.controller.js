const { sendErrorResponse } = require('../helpers/send_error_response');
const Author = require('../schemas/Author');
const { authorValidation } = require('../validation/author.validate');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('config');
const {authorJwtService} = require('../service/jwt.service');
const uuid = require('uuid');
const {AuthMailServicee} = require('../service/mail.service');

const addAuthor = async (req, res) => {
    try {
        const { error, value } = authorValidation(req.body);
        if (error) {
            return sendErrorResponse(error, res);  
        }

        const hashedPassword = bcrypt.hashSync(value.password, 7)
        const activation_link = uuid.v4()

        const newAuthor = await Author.create({...value, password: hashedPassword, activation_link});

        const link = `${config.get("api_url")}/api/authors/activate/${activation_link}`
        await AuthMailServicee.Sendmail(value.email, link)

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

        const tokens = authorJwtService.generateTokens(payload)
        author.refresh_token = tokens.refreshToken
        await author.save()

        res.cookie("refreshToken", tokens.refreshToken,{
            httpOnly: true,
            maxAge: config.get("cookie_refresh_time")
        })


        //------------------------------------------------------------------------------------------------

        // try {
        //     setTimeout(function(){
        //         throw new Error("Uncaught Exception example")
        //     }, 1000);
        // } catch (error) {
        //     console.log(error)
        // }


        // new Promise((_, reject) => {
        //     reject(new Error("UnHandlerRejection example"))
        // })

        //------------------------------------------------------------------------------------------------





        res.status(201).send({ message: "You entered, Welcome", id: author.id, accessToken: tokens.accesToken});
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const logout = async (req, res) =>{
    try {
        const {refreshToken} = req.cookies

        if (!refreshToken){
            return res.status(400).send({message: "no found cookie in refresh token"})
        }

        const author = await Author.findOneAndUpdate({refresh_token: refreshToken},{refresh_token: ""}, {new: true} )
        if(!author) {
            return res.status(400).send({message: "no found cookie in refresh token"})
        }

        res.clearCookie("refreshToken");
        res.send({author})

    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const refreshAuthToken = async (req, res) => {
    try {
        const {refreshToken} = req.cookies;

        if (!refreshToken){
            return res.status(400).send({message: "no found cookie in refresh token"})
        }

        await authorJwtService.verifyRefreshToken(refreshToken);
        const author = await Author.findOne({refresh_token: refreshToken});
        
        if(!author) {
            return res.status(401).send({message: "not found refresh token in base"})
        }

        const payload = {
            id: author._id,
            email: author._email,
            is_active: author.is_active,
            is_expert: author.is_expert
        }

        const tokens = authorJwtService.generateTokens(payload)
        author.refresh_token = tokens.refreshToken
        await author.save()

        res.cookie("refreshToken", tokens.refreshToken,{
            httpOnly: true,
            maxAge: config.get("cookie_refresh_time")
        })

        res.status(201).send({ message: "Tokens updated", id: author.id, accessToken: tokens.accesToken});

    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const authorActivate = async (req, res) => {
    try {
        const { link } = req.params
        const author = await Author.findOne({activation_link: link});

        if(!author) {
            return res.status(400).send({message: "Avtor link is not corect"})
        }

        if (author.is_active){
            return res.status(400).send({message: "Avtor authorized before"})
        }

        author.is_active = true
        await author.save()
        res.send({message: "Avtor activated", isActive: author.is_active})
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

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
