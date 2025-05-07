const sendErrorResponse = (error, res) => {
    res.status(400).send({message: "Error", error: error?.message});
}

module.exports = {sendErrorResponse}