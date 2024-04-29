const Topic = require('../Models/Topic');
const User = require('../Models/User');

class TopicController {
    async createTopic(req, res) {
        try {
            const { name } = req.body;
            const topic = new Topic(name);
            await topic.save();
            res.status(201).json({ message: 'Topic created successfully', topic });
        } catch (error) {
            res.status(500).json({ message: 'Error creating topic', error: error.message });
        }
    }

    async getTopics(req, res) {
        try {
            const topics = await Topic.find();
            res.status(200).json(topics);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching topics', error: error.message });
        }
    }

    async subscribeToTopic(req, res) {
        const { topicId } = req.params;
        const username = req.cookies.auth;
    
        if (!username) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        try {
            const topic = await Topic.findOne({ name: topicId });
            if (!topic) {
                return res.status(404).json({ message: 'Topic not found' });
            }
            topic.subscribers.push(username);
            await topic.save();

            const user = await User.findOne({ username });
            user.subscriptions.push(topicId);
            await user.save();
    
            res.status(200).json({ message: 'Subscribed to topic successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error subscribing to topic', error: error.message });
        }
    }

    async unsubscribeFromTopic(req, res) {
        const { topicId } = req.params;
        const username = req.cookies.auth;

        if (!username) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const topic = await Topic.findOne({ _id: topicId });
            if (!topic) {
                return res.status(404).json({ message: 'Topic not found' });
            }
            topic.subscribers = topic.subscribers.filter(subscriber => subscriber !== username);
            await topic.save();

            const user = await User.findOne({ username });
            user.subscriptions = user.subscriptions.filter(subscription => subscription.toString() !== topicId);
            await user.save();

            res.status(200).json({ message: 'Unsubscribed from topic successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error unsubscribing from topic', error: error.message });
        }
    }
}

module.exports = new TopicController();