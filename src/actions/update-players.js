export const UPDATE_PLAYERS = 'UPDATE_PLAYERS'

export default (players) => {
  return {
    type: UPDATE_PLAYERS,
    payload: players
  }
}
