const { connection } = require("./libs/dbhelper")

const ladder1m = require("./alpha-game/ladder1m")
const penaltykick1m = require("./alpha-game/penaltykick1m")
;(async () => {
  console.log("========START ENGINE========")
  try {
    await connection()
    ladder1m.start()
    penaltykick1m.start()
  } catch (error) {
    console.error("Connection or engine start failed:", error)
  }
})()
