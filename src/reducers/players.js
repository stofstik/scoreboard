import { UPDATE_PLAYERS } from '../actions/update-players'
import { ADD_PLAYER } from '../actions/add-player'
import { DELETE_PLAYER } from '../actions/delete-player'
import { PLUS_ONE } from '../actions/plus-one'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case UPDATE_PLAYERS :
      return sortPlayers(payload)

    case PLUS_ONE :
      return sortPlayers(state.map((player) => {
        if (player.playerId === payload) {
          return Object.assign(
            {}, player, { points: player.points + 1 })
        }
        return player
      }))

    case ADD_PLAYER :
      const newPlayer = {
        playerId: nextPlayerId(state),
        name: payload.name,
        avatar: `https://api.adorable.io/avatars/285/${payload}.png`,
        points: 0,
        rankedAt: -1
      }
      return sortPlayers(state.concat([ newPlayer ]))

    case DELETE_PLAYER :
      return sortPlayers(state.filter((player) => {
        return player.playerId != payload
      }))

    default:
      return state
  }
}

export const nextPlayerId = (players) => {
  return players.reduce((previousHighestValue, nextPlayerToCheck) => {
    return (previousHighestValue > nextPlayerToCheck.playerId) ?
      previousHighestValue : nextPlayerToCheck.playerId
  }, 0) + 1
}

export const sortPlayers = (players) => {
  // Get all points and squish them down to unique values
  // Thank you google...
  const uniquePoints = [...new Set(players.map((p) => p.points))].sort((p, n) => n - p)
  console.log(uniquePoints)
  // Get points per rank otherwise return 0
  const pointsFirst  = uniquePoints[0] ? uniquePoints[0] : 0
  const pointsSecond = uniquePoints[1] ? uniquePoints[1] : 0
  const pointsThird  = uniquePoints[2] ? uniquePoints[2] : 0
  console.log('1 %s, 2 %s, 3 %s', pointsFirst, pointsSecond, pointsThird)

  // Podium
  var gold = []
  var silver = []
  var bronze = []
  var losers = []
  var neebs = []

  // Give trophies yay!
  function giveTrophies(){
    players.map((p, index) => {
      if(p.points >= 10) {
        switch (p.points){
          case pointsFirst:
            if (gold.length < 3){
              gold.concat([Object.assign({}, p, { hasTrophy: true, rank: 0, rankedAt: new Date().getTime() })])
            }
          case pointsSecond:
            if (silver.length < 3){
              silver.concat([Object.assign({}, p, { hasTrophy: true, rank: 1, rankedAt: new Date().getTime() })])
            }
          case pointsThird:
            if (bronze.length < 3){
              bronze.concat([Object.assign({}, p, { hasTrophy: true, rank: 2, rankedAt: new Date().getTime() })])
            }
          default:
            losers.concat([Object.assign({}, p, { hasTrophy: false, rank: index + 2 })])
        }
      } else {
        neebs.concat([Object.assign({}, p, { hasTrophy: false, rank: index + 2 })])
      }
    })
  }
  return gold.concat(silver).concat(bronze).concat(losers).concat(neebs)
}
