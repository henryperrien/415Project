const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const database = require('./database');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const defaultRoutes = require('./Routes/index');
const userRoutes = require('./Routes/userRouter');
const messageRoutes = require('./Routes/messageRouter');
const topicRoutes = require('./Routes/topicRouter');

app.use('/', defaultRoutes);
app.use('/user', userRoutes);
app.use('/msgs', messageRoutes);
app.use('/topic', topicRoutes);



const uri = "mongodb+srv://henryperrien:Wojtek53748476301@cluster0.p1yctfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


database.connect(uri).then((db) => {
    app.listen(PORT, () => console.log('Server started at http://localhost:' + PORT));
})