const { connection } = require("./libs/dbhelper")

// include engine
const football = require("./engines/football")

;(async () => {
  console.log("========START ENGINE========")
  await connection()

  football.start()
})()
