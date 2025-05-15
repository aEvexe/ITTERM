const { sendErrorResponse } = require('../helpers/send_error_response');
const User = require('../schemas/User');
const userValidation = require("../validation/user.validate")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtUserService = require('../service/jwt.user.service');

const addUser = async (req, res) => {
    try {
        const { error, value } = userValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }
        const newUser = await User.create(value);
        res.status(201).send({message: "New user added", newUser})
    } catch (error) {
        sendErrorResponse()
    }
}

const getAll = async (req, res) => {
    try {
        const data = await User.find({})
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await User.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
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
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await User.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
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
            email: user._email,
            is_active: user._is_active,
            is_creator: user._is_creator
        }

        const tokens = jwtUserService.generateTokens(payload)
        user.refresh_token = tokens.refreshToken
        await user.save()

        res.cookie("refreshToken", tokens.refreshToken,{
            httpOnly: true,
            maxAge: config.get("user_cookie_refresh_time")
        })

        res.status(201).send({ message: "You entered, Welcome", id: user.id, token });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const logout = (req, res) => {
    try {
        const {refreshToken} = req.cookies
        if(!refreshToken) {
            res.status(400).send({message: "refreshToken not found"})
        }

        const user = User.findOneAndUpdate({refresh_token: refreshToken}, {refresh_token: ""}, {new: true})

        res.clearCookie("refreshToken")
        res.send({user})

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
    logout
}