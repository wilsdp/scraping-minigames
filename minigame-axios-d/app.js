const { connection } = require("./libs/dbhelper")

const engineJWCAngelD = require("./engines/jwc_AngelD40s")
const engineJWCMario = require("./engines/jwc_Mario40s")
const engineJWCOstrich = require("./engines/jwc_Ostrich40s")

;(async () => {
  console.log("========START ENGINE========")
  try {
    await connection()
    await engineJWCAngelD.start()
    await engineJWCMario.start()
    await engineJWCOstrich.start()
  } catch (error) {
    console.error("Connection or engine start failed:", error)
  }
})()
