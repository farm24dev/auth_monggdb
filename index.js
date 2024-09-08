const express = require('express');
const connectDB = require('./configs/database.js');
const authRoutes = require('./routers/auth.js');
const userRoutes = require('./routers/user.js');
const morgan = require('morgan')
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(morgan('combined'))

// app.get('/', async (req, res) => {
//     // const buffer = await fs.promises.readFile('./images/pexels-valeriya-1805164.jpg')
//     // res.send(buffer)

//     //res.download('./images/pexels-valeriya-1805164.jpg','dog.jpg')

//     res.end()
// })

connectDB();




// ใช้เส้นทางที่แยกไว้ใน routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);


app.listen(port, () => {
    console.log(`server is running port ${port}`)
})