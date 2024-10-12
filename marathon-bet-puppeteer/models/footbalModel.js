const { DataTypes } = require("sequelize")
const { sequelize } = require("../libs/dbhelper")

const MBfootball_model = sequelize.define(
  "MBfootballData",
  {
    mini_code: {
      type: DataTypes.STRING(24),
      defaultValue: "MB_FOOTBALL",
      primaryKey: true,
      allowNull: false,
    },
    mini_rotation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    homeTeam: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
    awayTeam: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "miniGames",
    timestamps: false,
  },
)

exports.insertMBFData = async (game) => {
  //   try {
  //     const dataResult = await MBfootball_model.create({
  //       mini_code: game.round,
  //       mini_rotation_id: game.result,
  //       homeTeam: game.gameDate,
  //       awayTeam: game.regDateTime,
  //       score: game.gameDateTime,
  //       time: game.resultDateTime,
  //     })
  //     console.log(dataResult)
  //     return { success: true, data: dataResult }
  //   } catch (err) {
  //     console.error(`Error inserting data: ${err.message}`)
  //     return { success: false, error: err.message }
  //   }
  // }

  const payload = {
    mini_rotation_id: game.rotation,
    mini_round_id: game.round,
    rotationStatus: isUpdate ? 1 : 0,
    rotationCustomYn: isUpdate === 0,
    rotationResult: JSON.stringify({
      lr: game.lr,
      tf: game.tf,
      oe: game.oe,
      lroe: game.lroe,
      gameDateTime: game.gameDateTime,
      resultDateTime: game.resultDateTime,
    }),
    rotationGameDate: game.gameDateTime,
    rotationGetResultDate: game.resultDateTime,
  }

  try {
    const existingRecord = await L1Model.findOne({
      where: {
        mini_code: game.gameName,
        mini_rotation_id: game.rotation,
      },
    })

    let dataResult

    if (existingRecord && isUpdate) {
      // Update logic
      dataResult = await L1Model.update(payload, {
        where: {
          mini_code: game.gameName,
          mini_rotation_id: game.rotation,
        },
      })
      console.log(`\x1b[32mRecord Updated:\x1b[0m`)
    } else if (!existingRecord) {
      // Create logic
      dataResult = await L1Model.create(payload)
      console.log(`\x1b[32mRecord Created:\x1b[0m`)
    } else {
      // Record exists and not updating, handle accordingly
      console.log(
        `\x1b[31mRecord with \x1b[32mmini_code: \x1b[33m${game.gameName}\x1b[31m and \x1b[32mmini_rotation_id: \x1b[33m${game.rotation}\x1b[31m already exists. Skipping creation.\x1b[0m`,
      )
      return {
        success: true,
        message: "Record already exists, skipping creation.",
      }
    }

    return { success: true, data: dataResult }
  } catch (err) {
    console.error(`Error in operation: ${err.message}`)
    return { success: false, error: err.message }
  }
}
