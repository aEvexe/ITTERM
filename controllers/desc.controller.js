const { sendErrorResponse } = require('../helpers/send_error_response');
const Category = require('../schemas/Category');
const Description = require('../schemas/Description');
const descValidation = require('../validation/desc.validate')

const addDesc = async (req, res) => {
    try {
        const {error, value} = descValidation(req.body)
        if(error){
            return sendErrorResponse(error, res)
        }
        const newDesc = await Description.create(value);
        res.status(201).send({message: "New social added", newDesc})
    } catch (error) {
        sendErrorResponse()
    }
}

const getAll = async (req, res) => {
    try {
        const data = await Description.find().populate('category_id')
        res.status(200).send({message: data})
    } catch (error) {
        console.log("error", error.message);
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Description.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}


const update = async (req, res) => {
    try {
        const {error, value} = descValidation(req.body)
        if(error){
            return sendErrorResponse(error, res)
        }

        const { id } = req.params
        const data = await Description.findByIdAndUpdate(id, value, { new: true })
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Description.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

module.exports = {
    addDesc,
    getAll,
    findById,
    update,
    remove,
}