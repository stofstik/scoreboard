import { UPDATE_PLAYERS } from '../actions/update-players'
import { ADD_PLAYER } from '../actions/add-player'
import { DELETE_PLAYER } from '../actions/delete-player'
import { PLUS_ONE } from '../actions/plus-one'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case UPDATE_PLAYERS :
      return payload

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
        name: payload,
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
  /*
   * Get the points per rank
   */
  const pointsFirst = players.reduce((p, n) => {
    return (p > n.points) ? p : n.points
  }, 0)
  const pointsSecond = players.reduce((p, n) => {
    return (p > n.points && p !== pointsFirst) ? p : n.points
  }, 0)
  const pointsThird = players.reduce((p, n) => {
    return (p > n.points && p !== pointsFirst && p !== pointsSecond) ? p : n.points
  }, 0)
  console.log('1 %s, 2 %s, 3 %s', pointsFirst, pointsSecond, pointsThird)

  /*
   * Keep track of amount of trophies given
   */
  const gold   = []
  const silver = []
  const bronze = []

  // Give trophies yay!
  return players.map((p) => {
    // Only give a trophy above 9 points
    if(p.points >= 10) {
      // Check the rank and give a trophy accordingly
      switch (p.points){
        case pointsFirst:
          // Check if there are still trophies to be handed out
          if(gold.length <= 3){
            gold.concat([p.playerId])
            return Object.assign({}, p, { hasTrophy: true, rank: 0, rankedAt: new Date().getTime() })
          } else {
            return Object.assign({}, p, { hasTrophy: false, rank: 0 })
          }
        case pointsSecond:
          if(silver.length <= 3){
            silver.concat([p.playerId])
            return Object.assign({}, p, { hasTrophy: true, rank: 1, rankedAt: new Date().getTime() })
          } else {
            return Object.assign({}, p, { hasTrophy: false, rank: 1 })
          }
        case pointsThird:
          if(bronze.length <= 3){
            bronze.concat([p.playerId])
            return Object.assign({}, p, { hasTrophy: true, rank: 2, rankedAt: new Date().getTime() })
          } else {
            return Object.assign({}, p, { hasTrophy: false, rank: 2 })
          }
      }
    } else {
      return Object.assign({}, p, { hasTrophy: false, rank: 3 })
    }
  }).concat().sort((prev, next) => {
    return next.points - prev.points
  })
}
