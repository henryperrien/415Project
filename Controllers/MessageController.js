const Message = require('../Models/Message');
const User = require('../Models/User');

class MessageController {
    async postMessage(req, res) {
        const { description, topicId } = req.body;
        const username = req.cookies.auth;
        if (!username) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const message = new Message(description, topicId, username);
        await message.save();
        res.status(201).json({ message: 'Message posted successfully' });
    }

    async getMessages(req, res) {
        const username = req.cookies.auth;
        if (!username) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findOne({ username });
        const subscribedTopics = user.subscriptions;
        
        const recentMessages = await Promise.all(subscribedTopics.map(async (topicId) => {
            const messages = await Message.findMessagesByTopicId(topicId);
            return messages.slice(-2);
        }));
        res.json(recentMessages);
        console.log(recentMessages);
    }
}

module.exports = new MessageController();