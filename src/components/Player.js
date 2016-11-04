import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import plusOne from '../actions/plus-one'
import recalcPodium from '../actions/recalc-podium'
import deletePlayer from '../actions/delete-player'
import Trophy from './Trophy'
import './Player.sass'

export class Player extends Component {
  plusOne() {
    const { playerId, plusOne, recalcPodium } = this.props
    plusOne(playerId)
  }

  deleteMe() {
    const { playerId, deletePlayer } = this.props
    deletePlayer(playerId)
  }

  render() {
    const { playerId, name, avatar, points, rank, hasTrophy } = this.props

    return (
      <li className="player">
        <div className="avatar">
          <img src={ avatar } />
        </div>
        <div className="label">
          { hasTrophy ? <Trophy rank={ rank }/> : null}
          <span className="score">{ points }</span>
          .&nbsp;
          <Link className="name" to={ `/players/${playerId}` }>{ name }</Link>
        </div>
        <button className="plus-one" onClick={ this.plusOne.bind(this) }>+1</button>
        <button className="delete" onClick={ this.deleteMe.bind(this) }>x</button>
      </li>
    )
  }
}

export default connect(null, { deletePlayer, plusOne })(Player)
