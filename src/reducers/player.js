import { UPDATE_PLAYER } from '../actions/update-player'

export default (state = {}, { type, payload } = {}) => {
  switch(type) {
    case UPDATE_PLAYER :
      return payload
    default :
      return state
  }
}
