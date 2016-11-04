// src/containers/Scoreboard.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Title from '../components/Title'
import CreatePlayer from '../components/CreatePlayer'
import Player from '../components/Player'
import updatePlayers from '../actions/update-players'
import './Scoreboard.sass'

export class Scoreboard extends Component {
  componentDidMount() {
    this.props.updatePlayers()
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

export default connect(mapStateToProps, { updatePlayers })(Scoreboard)
