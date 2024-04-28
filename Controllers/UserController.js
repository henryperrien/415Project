const User = require('../Models/User');



class UserController {
    async register(req, res) {
        const { username, password } = req.body;
        try {
            const user = new User(username, password);
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error: error.message });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username, password });
            if (user) {
                res.cookie('auth', username, { httpOnly: true });
                res.status(200).json({ message: 'User logged in successfully' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    }
}

module.exports = new UserController();