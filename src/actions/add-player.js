// src/actions/add-player.js
import api from '../middleware/api'
import appLoading from './loading'
import updatePlayers from './update-players'
export const ADD_PLAYER = 'ADD_PLAYER'

export default (name) => {
  return (dispatch) => {
    dispatch(appLoading(true))

    api.post('players', { name })
      .then((player) => {
        dispatch(addPlayer(player))
        dispatch(appLoading(false))
        dispatch(updatePlayers(true))
      })
  }
}

export const addPlayer = (newPlayer) => {
  return {
    type: ADD_PLAYER,
    payload: newPlayer
  }
}
