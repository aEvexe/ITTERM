const { sendErrorResponse } = require('../helpers/send_error_response');
const Social = require('../schemas/Social');

const addSocial = async (req, res) => {
    try {
        const data = req.body
        const newSocail = await Social.create(data);
        res.status(201).send({message: "New social added", newSocail})
    } catch (error) {
        sendErrorResponse()
    }
}

const getAll = async (req, res) => {
    try {
        const data = await Social.find({})
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Social.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}


const update = async (req, res) => {
    try {
        const { id } = req.params
        const {social_name, social_icon_name} = req.body
        const data = await Social.findByIdAndUpdate({_id: id}, {social_name, social_icon_name}, { new: true })
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Social.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

module.exports = {
    addSocial,
    getAll,
    findById,
    update,
    remove,
}