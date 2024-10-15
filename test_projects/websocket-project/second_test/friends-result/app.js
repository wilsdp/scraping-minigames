const { db } = require('./libs/db')

// include engine
const engineRace = require('./engines/race')
const engineBaseball = require('./engines/baseball')
const engineGolf = require('./engines/golf')

;(async () => {
    console.log('========START ENGINE========')
    await db.connect()

    engineRace.start()
    engineBaseball.start()
    engineGolf.start();

})()