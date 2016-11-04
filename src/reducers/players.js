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
      return sortPlayers(state.concat([ payload ]))

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
  return players.concat().sort((prev, next) => {
    return next.points - prev.points
  })
}
