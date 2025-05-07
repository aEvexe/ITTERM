const { sendErrorResponse } = require('../helpers/send_error_response');
const Tag = require('../schemas/tag');
const tagValidation = require("../validation/tag.validation")

const addTag = async (req, res) => {
    try {
        const {error, value} = tagValidation(req.body)
        if(error){
            return sendErrorResponse(error, res)
        }
        const newTag = await Tag.create(value);
        res.status(201).send({message: "New tag added", newTag})
    } catch (error) {
        sendErrorResponse(error, res)
    }
}  
 
const getAll = async (req, res) => {
    try {
        const data = await Tag.find().populate('category_id')
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Tag.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const update = async (req, res) => {
    try {
        const {error, value} = tagValidation(req.body)
        if(error){
            return sendErrorResponse(error, res)
        }

        const { id } = req.params
        const data = await Tag.findByIdAndUpdate(id, value, { new: true } )
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Tag.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

module.exports = {
    addTag,
    getAll,
    findById,
    update,
    remove,
} 