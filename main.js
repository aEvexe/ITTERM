const express = require('express');
const config = require('config');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const indexRouter = require("./routes/index.routes");
const expressHttpLog = require("./middleware/expressHttpLogFile/expressHttpLog")
const expressErrorLog = require("./middleware/expressHttpLogFile/expressErrorLog")
const errorHandlerMiddleware = require('./middleware/errors/error-handler.middleware');
const logger = require('./service/logger.service');
const PORT = config.get('PORT') || 3030;
require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const winston = require('winston');
const expressWinston = require('express-winston');
// console.log(process.env.secret_token);
// console.log(process.env.NODE_ENV);
// console.log(config.get("secret_token")) 

// process.on('uncaughtException', (exception) => {console.log("uncaught Exception", exception.message)})
// process.on("unhandledRejection", (rejection) => {console.log("unhandledRejection", rejection)})



// logger.log("info","oddiy log")
// logger.error("oddiy log emas")
// logger.debug("oddiy log emas")
// logger.warn("oddiy log emas")
// logger.info("oddiy log emas")

// logger.trace("oddiy log emas")
// logger.table(["js", "py", "java"])
// logger.table([["js", "py", "java"]])

const app = express()
app.use(cookieParser())
app.use(express.json())


app.use(expressHttpLog);
app.use("/api", indexRouter)
app.use(expressErrorLog);
app.use(errorHandlerMiddleware)

async function start(){
    try {
        const uri = config.get("dbUri");
        await mongoose.connect(uri)
        app.listen(PORT, () => {
        console.log(`Server is running http://localhost:${PORT}`)
    })
    } catch (error) {
        console.log(error)
    }
}    

start() 
