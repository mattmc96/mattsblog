const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// Bring Routes
const blogRouter = require('./routes/blogRouter')
const authRouter = require('./routes/authRouter')

// App
const app = express()

// DB
mongoose
        .connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        .then(() => console.log('DB connected'))

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// Cors
if (process.env.NODE_ENV==='development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}
// Routes Middleware
app.use('/api', blogRouter)
app.use('/api', authRouter)

// Port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

