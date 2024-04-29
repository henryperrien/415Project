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

    async subscribe(User) {
        const db = database.getDB();
        await db.collection('UserCollection415').updateOne(
            { topicId: this.topicId },
            { $addToSet: { subscribers: username } }
        );
    }

    async unsubscribe(User) {
        const db = database.getDB();
        await db.collection('UserCollection415').updateOne(
            { username: this.topicId },
            { $pull: { subscribers: username } }
        );
    }

}

module.exports = Topic;