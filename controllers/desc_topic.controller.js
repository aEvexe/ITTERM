const { sendErrorResponse } = require('../helpers/send_error_response');
const Desctopic = require('../schemas/desc_topic');
const desctopicValidation = require("../validation/desc_topic.validate")

const addDesc_topic = async (req, res) => {
    try {
        const {error, value} = desctopicValidation(req.body)
        if(error){
            return sendErrorResponse(error, res)
        }
        const newDesc_topic = await Desctopic.create(value);
        res.status(201).send({message: "New desc added", newDesc_topic})
    } catch (error) {
        sendErrorResponse()
    }
}

const getAll = async (req, res) => {
    try {
        const data = await Desctopic.find({})
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Desctopic.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}


const update = async (req, res) => {
    try {
        const {error, value} = desctopicValidation(req.body)
        if(error){
            return sendErrorResponse(error, res)
        }
        const { id } = req.params
        const data = await Desctopic.findByIdAndUpdate(id, value, { new: true })
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Desctopic.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

module.exports = {
    addDesc_topic,
    getAll,
    findById,
    update,
    remove,
}