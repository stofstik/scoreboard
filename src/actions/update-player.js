export const UPDATE_PLAYER = 'UPDATE_PLAYER'

export default (player) => {
  return {
    type: UPDATE_PLAYER,
    payload: player
  }
}
