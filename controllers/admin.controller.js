const { sendErrorResponse } = require('../helpers/send_error_response');
const Admin = require('../schemas/Admin');
const adminValidation = require("../validation/admin.validate")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('config');


const addAdmin = async (req, res) => {
    try {
        const { error, value } = adminValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }

        const hashedPassword = bcrypt.hashSync(value.password, 7)

        const newAdmin = await Admin.create({...value, password: hashedPassword});
        res.status(201).send({message: "New admin added", newAdmin})
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const getAll = async (req, res) => {
    try {
        const data = await Admin.find({})
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Admin.findById(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}


const update = async (req, res) => {
    try {
        const { error, value } = adminValidation(req.body) 
        if(error) {
            return sendErrorResponse(error, res)
        }

        const { id } = req.params
        const data = await Admin.findByIdAndUpdate(id, value, { new: true } )
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Admin.findByIdAndDelete(id)
        res.status(200).send({message: data})
    } catch (error) {
        sendErrorResponse()
    }
}

const login = async (req, res) => {
    try {
        const { email, password} = req.body
        const admin = await Admin.findOne({ email })
        if (!admin){
            return res.status(401).send({message: "email or password is incorrect"})

        }

        const validPassword = bcrypt.compareSync(password, admin.password)
        if(!validPassword) {
            return res.status(401).send({message: "email or password is incorrect"})
        }

        const payload = {
            id: admin._id,
            email: admin._email,
            is_active: admin._is_active,
            is_creator: admin._is_creator
        }

        const token = jwt.sign(payload, config.get("adminTokenKey"), {
            expiresIn: config.get("tokenExpTime")
        })

        res.status(201).send({ message: "You entered, Welcome", id: admin.id, token });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}



module.exports = {
    addAdmin,
    getAll,
    findById,
    update,
    remove,
    login
}