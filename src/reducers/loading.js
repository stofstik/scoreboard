import { LOADING } from '../actions/loading'

export default (state = false, { type, payload } = {}) => {
  switch(type) {
    case APP_LOADING:
      return true
    case APP_READY:
      return false
    default:
      return state
  }

}
