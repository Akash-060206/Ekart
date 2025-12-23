import express from 'express';
import 'dotenv/config'
import connectDb from './config/mongodb.js';

//APP config
const app = express()
const port = process.env.PORT || 4000
connectDb()


app.get('/', (req, res) => {
    res.send('API working')
})

app.listen(port, () => console.log('Server Started on Port: ' + port))