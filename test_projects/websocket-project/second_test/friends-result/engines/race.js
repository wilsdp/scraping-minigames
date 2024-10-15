// race
// ws endpoint : wss://minidata.fusoft001.com/minidata?gametype=6500
// request before results : {"FUN":"GetEndGameList","DATA":{"gametype":6500}}
// server send message when new result : {"FUN":"result","DATA":{"success":200,"message":true,"data":{"game_name":"Darlige","game_type":"6500","results":"{\"result\":2,\"ranking\":[2,1],\"run\":{\"1\":[58,66,65,51,44,47,33,18,15,150],\"2\":[28,28,26,40,27,19,6,13,27,150]}}","round_id":"2166","res":{"result":2,"ranking":[2,1],"run":{"1":[58,66,65,51,44,47,33,18,15,150],"2":[28,28,26,40,27,19,6,13,27,150]}}}}}

const WebSocket = require('ws')
const moment = require('moment')
const tools = require('../libs/tools')
const { db } = require('../libs/db')

const game = 'race'
const gameCycle = 30 // 30 seconds
const maxRound = 2880 // 24 hours * 60 minutes * 60 seconds / 30 seconds
const endpoint = 'wss://minidata.fusoft001.com/minidata?gametype=6500'

const race = {
    start: () => {
        const ws = new WebSocket(endpoint, {
            rejectUnauthorized: false
        })

        ws.on('open', function open() {
            console.log(`Connected to the websocket server - ${game}`)
        })

        ws.on('message', function incoming(data) {
            race.generateResultObject(data)
        })

        ws.on('close', function close() {
            console.log(`Disconnected from the websocket server - ${game}`)
            console.log(`Trying to reconnect in 5 seconds... - ${game}`)

            // 5초 후에 재접속 시도
            setTimeout(race.start, 5000)
        })

        ws.on('error', function error(err) {
            console.error(`WS Error ${game}:`, err)
        })
    },
    generateResultObject: (data) => {
        try {
            let rData = data.toString()
            rData = JSON.parse(rData)

            if(rData.FUN === 'result') {
                const startDateTime = moment().startOf('day')
                const round = parseInt(rData.DATA.data.round_id)

                let gameDateTime = moment(startDateTime).add(round * gameCycle, 'seconds').toDate()
                // subtract 1 day because new days
                if(round === maxRound) gameDateTime = moment(startDateTime).subtract(1, 'days').add(round * gameCycle, 'seconds').toDate()

                const rotation = parseInt(`${moment(gameDateTime).format('YYYYMMDD')}${tools.right(`000${round}`, 4)}`)
                let RCLM = rData.DATA.data.res.result === 1 ? 'lion' : 'muji'

                let objResult = {
                    rotation,
                    gameDateTime,
                    round,
                    RCLM,
                    getDateTime: new Date(),
                    from: 'friends',
                    regDateTime: new Date()
                }

                // console.log("Race Game")
                // console.log(objResult)
                race.saveData(objResult)
            }
        } catch (err) {
            console.error(`Error ${game}:`, err)
        }
    },
    saveData: async (objResult) => {
        try {
            const insertQuery = objResult

            const pool = await db.connect()
            await pool.collection('race').insertOne(insertQuery)
        } catch (err) {
            console.error(`DB Error ${game}:`, err)
        }
    }
}

module.exports = race