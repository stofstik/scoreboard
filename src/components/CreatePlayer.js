import React, { Component } from 'react'
import { connect } from 'react-redux'
import addPlayer from '../actions/add-player'
import updatePlayers from '../actions/update-players'
import appLoading from '../actions/loading'
import api from '../middleware/api'
import './CreatePlayer.sass'

export class CreatePlayer extends Component {
  save(event) {
    event.preventDefault()
    appLoading(true)

    const { addPlayer, updatePlayers } = this.props
    const name = this.refs.name.value
    api.post('players', { name })
      .then((player) => {
        addPlayer(player)
        appLoading(false)
        updatePlayers()
      })

    this.refs.name.value = null
    addPlayer(name)
  }

  render() {
    return (
      <form className="create-player" onSubmit={ this.save.bind(this) }>
        <div className="input">
          <input id="playerName" type="text" name="name" ref="name" />
          <input id="createPlayer" type="submit" value="Create Player" />
        </div>
      </form>
    )
  }
}

export default connect(null, { addPlayer, updatePlayers, appLoading })(CreatePlayer)
