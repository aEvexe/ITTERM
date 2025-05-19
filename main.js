const express = require('express');
const config = require('config');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const indexRouter = require("./routes/index.routes");
const viewRouter = require("./routes/views.routes")
const exHnb = require('express-handlebars')

const PORT = config.get('PORT') || 3030;
require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})



const app = express()
app.use(cookieParser())
app.use(express.json())

const hbs = exHnb.create({
    defaultLayout: "main",
    extname: "hbs",
})

app.engine("hbs", hbs.engine)
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static("views"))
//CORS

app.use("/", viewRouter)
app.use("/api", indexRouter)


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
