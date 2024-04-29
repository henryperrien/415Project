const database = require('../database.js');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.subscriptions =[];
    }

    async save() {
        try {
            const db = database.getDB();
            await db.collection('UserCollection415').insertOne(this);
        } catch (error) {
            console.error('Error saving user:', error);
            throw new Error('Error saving user');
        }
    }

    static async findOne(query) {
        try {
            const db = database.getDB();
            return await db.collection('UserCollection415').findOne(query);
        } catch (error) {
            console.error('Error finding user:', error);
            throw new Error('Error finding user');
        }
    }

    async subscribe(topicId) {
        const db = database.getDB();
        await db.collection('UserCollection415').updateOne(
            { username: this.username },
            { $addToSet: { subscriptions: topicId } }
        );
    }

    async unsubscribe(topicId) {
        const db = database.getDB();
        await db.collection('UserCollection415').updateOne(
            { username: this.username },
            { $pull: { subscriptions: topicId } }
        );
    }
}

module.exports = User;