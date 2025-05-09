const { sendErrorResponse } = require('../helpers/send_error_response');
const Question = require('../schemas/Question');
const questionValidation = require("../validation/question.validate")

const addQuestion = async (req, res) => {
    try {
        const { error, value } = questionValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }
        const newQuestion = await Question.create(value);
        res.status(201).send({message: "New user added", newQuestion})
    } catch (error) {
        sendErrorResponse()
    }
}

const getAll = async (req, res) => {
    try {
        const data = await Question.find({})
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Question.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}


const update = async (req, res) => {
    try {
        const { error, value } = questionValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }

        const { id } = req.params
        const data = await Question.findByIdAndUpdate(id, value, { new: true } )
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Question.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

module.exports = {
    addQuestion,
    getAll,
    findById,
    update,
    remove,
}