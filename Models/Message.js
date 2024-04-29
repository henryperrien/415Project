const database = require('../database.js');

class Message {
    constructor(description, topicId, username) {
        this.description = description;
        this.topicId = topicId;
        this.username = username;
    }

    save() {
        const db = require('../database').getDB();
        return db.collection('MessagesCollection').insertOne(this);
    }

    static findMessagesByUsername(username) {
        const db = require('../database').getDB();
        return db.collection('MessagesCollection')
                 .find({ username })
                 .toArray();
    }

    static async findMessagesByTopicId(topicName) {
        const db = require('../database').getDB();
        return await db.collection('MessagesCollection')
                 .find({ topicId: topicName })
                 .toArray();
    }
}

module.exports = Message;