const { sendErrorResponse } = require('../helpers/send_error_response');
const Synonym = require('../schemas/Synonym');

const addSynonym = async (req, res) => {
    try {
        const data = req.body
        const newSynonym = await Synonym.create(data);
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
        const { id } = req.params
        const { desc_id, dict_id } = req.body
        const data = await Synonym.findByIdAndUpdate({_id: id}, { desc_id, dict_id }, { new: true } )
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