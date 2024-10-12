require("dotenv").config()
const Sequelize = require("sequelize")
const dayjs = require("dayjs")
const utc = require("dayjs/plugin/utc")
const timezone = require("dayjs/plugin/timezone")
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Seoul")

const DATABASE = process.env.DB_DATABASE
const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  const tzDate = dayjs(date).tz()
  return tzDate.format("YYYY-MM-DD HH:mm:ss.SSS")
}
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
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        console.log("⭐️ SQL Server ⭐️")
        console.log(`host: ${HOST}`)
        console.log(`db: ${DATABASE}`)
        resolve()
      })
      .catch((err) => {
        console.error(`Unable to connect to the database: ${err}`)
        reject(err)
      })
  })
}
