const { db } = require('./libs/db')

// include engine
// Powerball Game
// const enginePowerball5 = require('./engines/powerball5')
// const enginePowerball3 = require('./engines/powerball3')

//Powerladder Game
// const enginePowerladder5 = require('./engines/powerladder5')
const enginePowerladder3 = require('./engines/powerladder3')


;(async () => {
    console.log('========START ENGINE========')
    await db.connect()
    
    //Powerball Game
    // enginePowerball5.start();
    // enginePowerball3.start();

    //Powerladder Game
    // enginePowerladder5.start();
    enginePowerladder3.start();
})()