const { MongoClient, ObjectId } = require('mongodb')
const config = require('../config')

// Database Name
const dbHost = config.db.host
const dbName = config.db.name
const dbUser = encodeURIComponent(config.db.id)
const dbPassword = encodeURIComponent(config.db.password)

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
// console.log(uri)

const client = new MongoClient(uri)

let pool = null
const db = {
    connect: () => new Promise(async (resolve, reject) => {
        if(pool) {
            resolve(pool)
            return
        }

        try {
            await client.connect()
            pool = client.db(dbName)

            console.log("Connected successfully to MongoDB Server")
            console.log(dbHost, dbName)

            resolve(pool)

        } catch (error) {
            console.log('Database Connection Failed! Bad Config: ', err)
            pool = null
            resolve(pool)
            return
        }
    })
}

module.exports = { db, ObjectId }