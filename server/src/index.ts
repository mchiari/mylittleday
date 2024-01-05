import express from 'express'
import http from 'http'
import bodyParser from 'body-parser' 
import cookieParser from 'cookie-parser' 
import compression from 'compression' 
import cors from 'cors'
import mongoose from 'mongoose'

import router from './router'

const app = express()
const port = 3030

app.use(cors({
    credentials: true,
    origin:'http://localhost:3000'
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`)
} )

app.get('/', (req: any, res: any) => {
  res.send('Hello World!')
})


const MONGO_URL = "mongodb+srv://chiarimatheus:iznogud13@mylittleday.3acwdnn.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())