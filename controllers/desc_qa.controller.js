const { sendErrorResponse } = require('../helpers/send_error_response');
const DescQa = require('../schemas/Desc_qa');
const descQaValidation = require("../validation/desc_qa")

const addDescQa = async (req, res) => {
    try {
        const { error, value } = descQaValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }
        const newDescQa = await DescQa.create(value);
        res.status(201).send({message: "New user added", newDescQa})
    } catch (error) {
        sendErrorResponse()
    }
}

const getAll = async (req, res) => {
    try {
        const data = await DescQa.find({})
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await DescQa.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}


const update = async (req, res) => {
    try {
        const { error, value } = descQaValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }

        const { id } = req.params
        const data = await DescQa.findByIdAndUpdate(id, value, { new: true } )
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await DescQa.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

module.exports = {
    addDescQa,
    getAll,
    findById,
    update,
    remove,
}