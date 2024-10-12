const { connection } = require("./libs/dbhelper")

// const engineLadder = require("./engines/gstLadder")
// const engineLionMuzzi = require("./engines/gstLionMuzzi")
const engineSplit = require("./engines/gstSplit")

;(async () => {
  console.log("========START ENGINE========")
  try {
    await connection()
    // await engineLadder.start()
    // await engineLionMuzzi.start()
    await engineSplit.start()
  } catch (error) {
    console.error("Connection or engine start failed:", error)
  }
})()
