const sendErrorResponse = (error, res) => {
    console.log(error);
    res.status(400).send({message: "Error", error: error.message});
}

module.exports = {sendErrorResponse}