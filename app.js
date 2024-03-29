const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const database = require('./database');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const defaultRoute = require('./Routes/index');
const userRoutes = require('./Routes/userRouter');

app.use('/', defaultRoute);
app.use('/user', userRoutes);



const uri = "mongodb+srv://henryperrien:Wojtek53748476301@cluster0.p1yctfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


database.connect(uri).then((db) => {
    app.listen(PORT, () => console.log('Server started at http://localhost:' + PORT));
})