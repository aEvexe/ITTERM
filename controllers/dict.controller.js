const { sendErrorResponse } = require('../helpers/send_error_response');
const Dict = require('../schemas/Dict');

const addDict = async (req, res) => {
    try {
        const {term} = req.body
        const newDict = await Dict.create({term, letter: term[0]});
        res.status(201).send({message: "New term added", newDict})
    } catch (error) {
        sendErrorResponse()
    }
}

const getAll = async (req, res) => {
    try {
        const data = await Dict.find({})
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Dict.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const findByLetter = async (req, res) => {
    try {
        const { letter } = req.params
        const escapedLetter = letter.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

        const data = await Dict.findOne({
            letter: { $regex: new RegExp(escapedLetter, "i") }
        });
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const { name, author, price, year, email, } = req.body
        const data = await Dict.findByIdAndUpdate({_id: id}, {name, author, price, year, email,}, { new: true })
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Dict.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

module.exports = {
    addDict,
    getAll,
    findById,
    update,
    remove,
    findByLetter
}