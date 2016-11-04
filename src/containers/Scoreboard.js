// src/containers/Scoreboard.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Title from '../components/Title'
import CreatePlayer from '../components/CreatePlayer'
import Player from '../components/Player'
import appLoading from '../actions/loading'
import updatePlayers from '../actions/update-players'
import api from '../middleware/api'
import './Scoreboard.sass'

export class Scoreboard extends Component {
  componentDidMount() {
    const { appLoading, updatePlayers } = this.props

    appLoading(true)

    api.get('players')
      .then((players) => {
        updatePlayers(players)
        appLoading(false)
      })
  }

  renderPlayer(player, index) {
    return <Player key={ index } rank={ index } { ...player } />
  }

  render() {
    const { players } = this.props

    return (
      <div className="scoreboard">
        <Title label="Scoreboard" />
        <CreatePlayer />
        <Title label="Neebs:" />
        <ul>
          { players.map(this.renderPlayer.bind(this)) }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    players: state.players,
  }
}

export default connect(mapStateToProps, { appLoading, updatePlayers })(Scoreboard)
