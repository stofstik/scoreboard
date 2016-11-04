import api from '../middleware/api'
import appLoading from './loading'

export const UPDATE_PLAYERS = 'UPDATE_PLAYERS'

export default (background = false) => {
  return (dispatch) => {
    if (background) dispatch(appLoading(true))

    api.get('players')
      .then((players) => {
        dispatch(updatePlayers(players))
        if (background) dispatch(appLoading(false))
      })
  }
}

export const updatePlayers = (players) => {
  return {
    type: UPDATE_PLAYERS,
    payload: players
  }
}
