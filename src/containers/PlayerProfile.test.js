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
  selectPlayer: chai.spy(),
}

describe('<PlayerProfile />', () => {
  const profile = shallow(<PlayerProfile { ...profileProps } />)

  it('called the  action', () => {
    const profile = mount(<PlayerProfile { ...profileProps } />)
    const { selectPlayer } = profileProps
    expect(selectPlayer).to.have.been.called.with(1)
  })

  it('has a class name "player-profile"', () => {
    expect(profile).to.have.className('player-profile')
  })

  it('renders a title', () => {
    expect(profile).to.have.descendants(Title)
  })
})
