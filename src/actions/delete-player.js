import api from '../middleware/api'
import appLoading from './loading'
import updatePlayers from './update-players'

export const DELETE_PLAYER = 'DELETE_PLAYER'

export default (playerId) => {
  return (dispatch) => {
    dispatch(appLoading(true))

    api.delete(`players/${playerId}`)
      .then(() => {
        deletePlayer(playerId)
        dispatch(appLoading(false))
        dispatch(updatePlayers(true))
      })
  }
}

export const deletePlayer = (playerId) => {
  return {
    type: DELETE_PLAYER,
    payload: playerId
  }
}
