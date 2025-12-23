import express from 'express';
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

//APP config
const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()


app.get('/', (req, res) => {
    res.send('API working')
})

app.listen(port, () => console.log('Server Started on Port: ' + port))