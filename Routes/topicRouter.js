const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const TopicController = require('../Controllers/TopicController');

router.post('/subscribe/:topicId', async (req, res, next) => {
    try {
        await TopicController.subscribeToTopic(req, res);
    } catch (error) {
        return next(error);
    }
});
router.get('/subscription/:topicId', async (req, res, next) => {
    try {
        await TopicController.checkSubscription(req, res);
    } catch (error) {
        return next(error);
    }
});
router.post('/unsubscribe/:topicId', TopicController.unsubscribeFromTopic);
router.get('/', async (req, res, next) => {
    try {
        const topics = await TopicController.getTopics(req, res);
        res.status(200).json(topics);
    } catch (error) {
        return next(error);
    }
});

router.post('/create', async (req, res) => {
    try {
        await TopicController.createTopic(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error creating topic', error: error.message });
    }
});

module.exports = router;