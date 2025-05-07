const { sendErrorResponse } = require('../helpers/send_error_response');
const Synonym = require('../schemas/Synonym');
const synonymValidation = require("../validation/synonym.validation")

const addSynonym = async (req, res) => {
    try {
        const {error, value} = synonymValidation(req.body)
        if(error){
            return sendErrorResponse(error, res)
        }
        const newSynonym = await Synonym.create(value);
        res.status(201).send({message: "New term added", newSynonym})
    } catch (error) {
        sendErrorResponse()
    }
}

const getAll = async (req, res) => {
    try {
        const data = await Synonym.find()
            .populate('desc_id') 
            .populate('dict_id');
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Synonym.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const update = async (req, res) => {
    try {
        const {error, value} = synonymValidation(req.body)
        if(error){
            return sendErrorResponse(error, res)
        }

        const { id } = req.params
        const data = await Synonym.findByIdAndUpdate(id, value, { new: true } )
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Synonym.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

module.exports = {
    addSynonym,
    getAll,
    findById,
    update,
    remove,
} 