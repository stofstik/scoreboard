// src/containers/Scoreboard.test.js

import React from 'react'
import wrapper from '../../test/wrapper'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import spies from 'chai-spies'
import { Scoreboard } from './Scoreboard'
import Player from '../components/Player'
import Title from '../components/Title'

chai.use(spies)
chai.use(chaiEnzyme())

const players = [
  {
    playerId: 4,
    avatar: 'http://cd.sseu.re/matthew-32094823098.png',
    name: 'Matthew',
    points: 0,
  },
  {
    playerId: 3,
    avatar: 'http://cd.sseu.re/miriam-3409830948.png',
    name: 'Miriam',
    points: 0,
  }
]

describe('<Scoreboard />', () => {
  const updatePlayers = chai.spy()
  const scoreboard = wrapper(<Scoreboard players={ players } updatePlayers={ updatePlayers } />)

  it('is wrapped in a div tag', () => {
    expect(scoreboard).to.have.tagName('div')
  })

  it('has a class name "scoreboard"', () => {
    expect(scoreboard).to.have.className('scoreboard')
  })

  it('renders the Title', () => {
    expect(scoreboard).to.have.descendants(Title)
  })

  it('renders the players', () => {
    expect(scoreboard).to.have.exactly(2).descendants(Player)
  })

  it('calls updatePlayers', () => {
    expect(updatePlayers).to.have.been.called()
  })
})
