import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '../middleware/api'
import appLoading from '../actions/loading'
import updatePlayer from '../actions/update-player'
import Title from '../components/Title'

export class PlayerProfile extends Component {
  componentWillMount() {
    this.props.appLoading(true)
  }

  componentDidMount() {
    const { appLoading, updatePlayer, routeParams } = this.props

    api.get(`players/${routeParams.playerId}`)
      .then((player) => {
        updatePlayer(player)
        appLoading(false)
      })
  }

  render() {
    if (this.props.player) {
      const { name } = this.props.player

      return (
        <div className="player-profile">
          <Title label={ name } />
        </div>
      )
    }

    return (
      <div className="player-profile">
        <Title label="Player not Found" />
        <p>with id: { this.props.routeParams.playerId }</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.players.reduce((prev, next) => {
        return (next.playerId === state.playerProfileId) ?
          next : prev
      }, null)
  }
}

export default connect(mapStateToProps, { selectPlayer })(PlayerProfile)
