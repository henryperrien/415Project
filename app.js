const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const database = require('./database');
const UserController = require('./Controllers/UserController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const defaultRoute = require('./Routes/index');
const userRoutes = require('./Routes/userRouter');

app.use('/', defaultRoute);
app.use('/user', userRoutes);
app.post('/login', async (req, res) => {
    try {
        await UserController.login(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

app.post('/register', async (req, res) => {
    try {
        await UserController.register(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});




const uri = "mongodb+srv://henryperrien:Wojtek53748476301@cluster0.p1yctfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


database.connect(uri).then((db) => {
    app.listen(PORT, () => console.log('Server started at http://localhost:' + PORT));
})