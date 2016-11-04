import React from 'react'
import chai, { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import spies from 'chai-spies'
import { PlayerProfile } from './PlayerProfile'
import Title from '../components/Title'

chai.use(spies)
chai.use(chaiEnzyme())

const profileProps = {
  routeParams: {
    playerId: 1
  },
  updatePlayer: chai.spy(),
}

describe('<PlayerProfile />', () => {
  const appLoading = chai.spy()
  const profile = shallow(<PlayerProfile appLoading={ appLoading } { ...profileProps } />)

  it('has a class name "player-profile"', () => {
    expect(profile).to.have.className('player-profile')
  })

  it('renders a title', () => {
    expect(profile).to.have.descendants(Title)
  })

  it('calls appLoading', () => {
    expect(appLoading).to.have.been.called.with(true)
  })
})
