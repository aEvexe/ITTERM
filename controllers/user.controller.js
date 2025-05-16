const { sendErrorResponse } = require('../helpers/send_error_response');
const User = require('../schemas/User');
const userValidation = require("../validation/user.validate")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('config');
const {userJwtService} = require('../service/jwt.service');
const {UserMailServicee} = require('../service/mail.service')
const uuid = require('uuid');

const addUser = async (req, res) => {
    try {
        const { error, value } = userValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }
        const activate_link = uuid.v4()

        const hashedPassword = bcrypt.hashSync(value.password, 7)

        const newUser = await User.create({...value, password: hashedPassword});

        const link = `${config.get("user_api_url")}/api/user/activate/${activate_link}`
        await UserMailServicee.Sendmail(value.email, link)

        res.status(201).send({message: "New user added", newUser})
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const getAll = async (req, res) => {
    try {
        const data = await User.find({})
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await User.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse(error, res)
    }
}


const update = async (req, res) => {
    try {
        const { error, value } = userValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }

        const { id } = req.params
        const data = await User.findByIdAndUpdate(id, value, { new: true } )
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await User.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const login = async (req, res) => {
    try {
        const { email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).send({message: "email or password is incorrect"})
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            return res.status(401).send({message: "email or password is incorrect"})
        }

        const payload = {
            id: user._id,
            email: user.email,
            is_active: user.is_active,
            is_creator: user.is_creator
        }

        const tokens = userJwtService.generateTokens(payload)
        user.refresh_token = tokens.refreshToken
        await user.save()

        res.cookie("refreshToken", tokens.refreshToken,{
            httpOnly: true,
            maxAge: config.get("user_cookie_refresh_time")
        })

        res.status(201).send({ message: "You entered, Welcome", id: user.id, accessToken: tokens.accesToken });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const logout = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        if(!refreshToken) {
            res.status(400).send({message: "refreshToken not found"})
        }

        const user = await User.findOneAndUpdate({refresh_token: refreshToken}, {refresh_token: ""}, {new: true})

        res.clearCookie("refreshToken")
        res.send({user})

    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const refreshToken = async (req, res) => {
    try {
        const {refreshToken} = req.cookies

        if(!refreshToken) {
            return res.status(400).send({message: "no found cookie in refresh token"}) 
        }

        await userJwtService.verifyRefreshToken(refreshToken)
        const user = await User.findOne({refresh_token: refreshToken})
        if(!user) {
            return res.status(400).send({message: "admin not found"})
        }

        const payload = {
            id: user._id,
            email: user.email,
            is_active: user.is_active,
            is_creator: user.is_creator
        }

        const tokens = userJwtService.generateTokens(payload)
        user.refresh_token = tokens.refreshToken
        await user.save();

        res.status(201).send({ message: "Tokens updated", id: user.id, accessToken: tokens.accesToken});

    } catch (error) {
        sendErrorResponse(error, res)
    }
}



module.exports = {
    addUser,
    getAll,
    findById,
    update,
    remove,
    login,
    logout,
    refreshToken
}