const { sendErrorResponse } = require('../helpers/send_error_response');
const User = require('../schemas/User');
const userValidation = require("../validation/user.validate")

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

module.exports = {
    addUser,
    getAll,
    findById,
    update,
    remove,
}