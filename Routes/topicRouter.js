const express = require('express');
const router = express.Router();
const TopicController = require('../Controllers/TopicController');

router.post('/subscribe/:topicId', TopicController.subscribeToTopic);
router.post('/unsubscribe/:topicId', TopicController.unsubscribeFromTopic);
router.post('/create', async (req, res) => {
    try {
        await TopicController.createTopic(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error creating topic', error: error.message });
    }
});

module.exports = router;