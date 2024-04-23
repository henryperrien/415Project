const database = require('../database.js');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
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
}

module.exports = User;