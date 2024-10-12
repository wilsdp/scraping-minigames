const { connection } = require("./libs/dbhelper")
const enginebosLadder1 = require("./engines/bosLadder1")
const enginebosLadder2 = require("./engines/bosLadder2")
const enginebosLadder3 = require("./engines/bosLadder3")

;(async () => {
  console.log("========START ENGINE========")
  try {
    await connection()
    await enginebosLadder1.start()
    await enginebosLadder2.start()
    await enginebosLadder3.start()
  } catch (error) {
    console.error("Connection or engine start failed:", error)
  }
})()
