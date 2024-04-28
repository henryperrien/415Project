const Message = require('../Models/Message');

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
        const messages = await Message.findMessagesByUsername(username);
        res.json(messages);
    }
}

module.exports = new MessageController();