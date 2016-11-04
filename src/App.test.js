// src/App.test.js
import React from 'react'
import wrapper from '../test/wrapper'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { App } from './App'

chai.use(chaiEnzyme())

const app = wrapper(<App />)

describe('<App />', () => {
  it('is wrapped in a div tag', () => {
    expect(app).to.have.tagName('div')
  })

  it('has the class name "app"', () => {
    expect(app).to.have.className('app')
  })
})
