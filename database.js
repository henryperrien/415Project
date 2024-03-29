const { MongoClient } = require("mongodb");

class Database {
    constructor(){
        this.client = null;
        this.db = null;
    }

    static getDBInstance(){
        if(!this.instance){
            this.instance = new Database();
        }
        return this.instance;
    }

    async connect(uri){
        try{
            if(!this.client){
                this.client = new MongoClient(uri);
                await this.client.connect();
                this.db = this.client.db();
            }
        } catch (error) {
            console.error('Database connection error:', error);
        }
        return this.db;
    }

    getDB(){
        return this.db;
    }
    
}

module.exports = Database.getDBInstance();