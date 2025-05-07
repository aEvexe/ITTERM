const { sendErrorResponse } = require('../helpers/send_error_response');
const Topic = require('../schemas/Topic');
const topicValidation  = require('../validation/topic.validation');


const addTopic = async (req, res) => {
    try {
        const { error, value } = topicValidation(req.body);
        if (error) {
            return sendErrorResponse(error, res);  
        }

       const newTopic = await Topic.create(value);


        res.status(201).send({ message: "New topic added", newTopic });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const getAll = async (req, res) => {
    try {
        const topic = await Topic.find().populate("author_id");
        res.status(200).send({ message: topic });
    } catch (error) {
        sendErrorResponse(error, res);  
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await Topic.findById(id);
        if (!author) {
            return sendErrorResponse({ message: 'Topic not found' }, res);
        }
        res.status(200).send({ message: topic });
    } catch (error) {
        sendErrorResponse(error, res);
    } 
};

const update = async (req, res) => {
    try {
        const { error, value } = topicValidation(req.body);
        if (error) {
            return sendErrorResponse(error, res);  
        }

        const { id } = req.params;  

        const updateTopic = await Topic.findByIdAndUpdate(id, value, { new: true });

        if (!updateTopic) {
            return sendErrorResponse({ message: 'Topic not found' }, res);
        }

        res.status(200).send({ message: "Topic updated", updatedTopic });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTopic = await Topic.findByIdAndDelete(id);
        if (!deletedTopic) {
            return sendErrorResponse({ message: 'Topic not found' }, res);
        }

        res.status(200).send({ message: "Topic deleted", deletedTopic });
    } catch (error) {
        sendErrorResponse(error, res);
    }
};

module.exports = {
    addTopic,
    getAll,
    getById,
    update,
    remove
};
