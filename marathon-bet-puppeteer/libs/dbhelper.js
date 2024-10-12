require("dotenv").config()
const Sequelize = require("sequelize")

const DATABASE = process.env.DB_DATABASE
const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: "mssql",
  maxConcurrentQueries: 100,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  dialectOptions: {
    encrypt: true, // For Azure SQL
    trustServerCertificate: true, // For self-signed certificates
  },
})

exports.sequelize = sequelize

exports.connection = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("⭐️ SQL Server ⭐️")
      console.log("host: ${ process.env.HOST }")
      console.log("db: ${ process.env.DATABASE }")
    })
    .catch((err) => {
      console.error(`Unable to connect to database ${err}`)
    })
}
