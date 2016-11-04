import api from '../middleware/api'
import appLoading from './loading'
import updatePlayers from './update-players'

export const PLUS_ONE = 'PLUS_ONE'

export default (playerId, points) => {
  return (dispatch) => {
    dispatch(appLoading(true))

    api.patch(`players/${playerId}`, { points: points + 1})
      .then(() => {
        plusOne(playerId)
        dispatch(appLoading(false))
        dispatch(updatePlayers(true))
      })
  }
}

export const plusOne = (playerId) => {
  return {
    type: PLUS_ONE,
    payload: playerId
  }
}
