const database = require('../database.js');

class Topic {
    constructor(name) {
        this.name = name;
        this.subscribers = [];
    }

    async save() {
        const db = database.getDB();
        return db.collection('TopicCollection').insertOne(this);
    }

    static async findOne(query) {
        const db = database.getDB();
        return await db.collection('TopicCollection').findOne(query);
    }

    static async findall() {
        const db = require('../database').getDB();
        return await db.collection('TopicCollection')
                 .find()
                 .toArray();
    }

    async addSubscriber(username) {
        const db = database.getDB();
        await db.collection('TopicCollection').updateOne(
            { name: this.name },
            { $addToSet: { subscribers: username } }
        );
    }

    async removeSubscriber(username) {
        const db = database.getDB();
        await db.collection('TopicCollection').updateOne(
            { name: this.name },
            { $pull: { subscribers: username } }
        );
    }
}

module.exports = Topic;