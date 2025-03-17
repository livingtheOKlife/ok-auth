import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { notFound, errorHandler } from './middleware/error.middleware.js'

const port = process.env.PORT || 5000

const app = express()

app.use('/', (req, res) => res.send('Server is Ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server is listening on port: ${port}`))
