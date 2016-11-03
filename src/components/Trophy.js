import React, { Component } from 'react'
import './Trophy.sass'

const RANKS = ['gold', 'silver', 'bronze']

class Trophy extends Component {
  rankName() {
    const { rank } = this.props
    return RANKS[rank]
  }

  render() {
    const { rank } = this.props

    return <span className={ `trophy ${this.rankName()}` }>♚</span>
  }
}

export default Trophy
