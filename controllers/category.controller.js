const { sendErrorResponse } = require('../helpers/send_error_response');
const Category = require('../schemas/Category');
const categoryValidation = require("../validation/category.validate")

const addCategory = async (req, res) => {
    try {
        const { error, value } = categoryValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }
        const newCategory = await Category.create(value);
        res.status(201).send({message: "New category added", newCategory})
    } catch (error) {
        sendErrorResponse()
    }
}

const getAll = async (req, res) => {
    try {
        const data = await Category.find({})
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Category.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}


const update = async (req, res) => {
    try {
        const { error, value } = categoryValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }

        const { id } = req.params
        const data = await Category.findByIdAndUpdate(id, value, { new: true } )
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Category.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

module.exports = {
    addCategory,
    getAll,
    findById,
    update,
    remove,
}