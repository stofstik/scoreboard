// src/App.js

import React from 'react'
import { connect } from 'react-redux'
import Loader from './components/Loader'
import './App.sass'

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        { this.props.children }
        { this.props.loading ? <Loader /> : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(App)
