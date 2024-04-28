const express = require('express');
const router = express.Router();
const MessageController = require('../Controllers/MessageController');

router.post('/post', async (req, res) => {
    try {
        await MessageController.postMessage(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error posting message', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        await MessageController.getMessages(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
});


module.exports = router;