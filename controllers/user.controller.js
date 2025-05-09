const { sendErrorResponse } = require('../helpers/send_error_response');
const User = require('../schemas/User');
const userValidation = require("../validation/user.validate")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('config');

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

        const token = jwt.sign(payload, config.get("userTokenKey"), {
            expiresIn: config.get("tokenExpTime")
        })

        res.status(201).send({ message: "You entered, Welcome", id: user.id, token });
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
    login
}