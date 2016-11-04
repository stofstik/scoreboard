import React, { Component } from 'react'
import { connect } from 'react-redux'
import appLoading from '../actions/loading'
import updatePlayer from '../actions/update-player'
import Title from '../components/Title'
import api from '../middleware/api'

export class PlayerProfile extends Component {
  componentDidMount() {
    const { routeParams, appLoading, updatePlayer } = this.props

    appLoading(true)

    api.get('players/' +  routeParams.playerId )
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
    player: state.player
  }
}

export default connect(mapStateToProps, { appLoading, updatePlayer })(PlayerProfile)
