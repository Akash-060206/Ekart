import express from 'express';
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';


//APP config
const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()

//API endpoints
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('API working')
})

app.listen(port, () => console.log('Server Started on Port: ' + port))