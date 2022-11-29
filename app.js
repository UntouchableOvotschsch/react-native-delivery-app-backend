require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const fs = require('fs')
const authMiddleware = require('./middleware/authMiddleware')

const app = express()
const port = process.env.PORT || 3001

app.use(morgan(process.env.LOG_LEVEL))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(mongoSanitize())


fs.readdirSync('./routes/').forEach( file => {
    let filename = file.slice(0,-3)
    app.use('/' + filename, require('./routes/' + filename))
})



app.listen(port, () => {
    console.log('Server started on http://localhost:' + port)
})