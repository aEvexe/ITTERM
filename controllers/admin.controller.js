const { sendErrorResponse } = require('../helpers/send_error_response');
const Admin = require('../schemas/Admin');
const adminValidation = require("../validation/admin.validate")

const addAdmin = async (req, res) => {
    try {
        const { error, value } = adminValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }
        const newAdmin = await Admin.create(value);
        res.status(201).send({message: "New admin added", newAdmin})
    } catch (error) {
        sendErrorResponse()
    }
}

const getAll = async (req, res) => {
    try {
        const data = await Admin.find({})
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Admin.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}


const update = async (req, res) => {
    try {
        const { error, value } = adminValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }

        const { id } = req.params
        const data = await Admin.findByIdAndUpdate(id, value, { new: true } )
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Admin.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

module.exports = {
    addAdmin,
    getAll,
    findById,
    update,
    remove,
}