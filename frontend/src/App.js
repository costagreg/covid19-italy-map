import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ItalyMap from './components/ItalyMap'
// import './App.scss'

export default class App extends Component {
  render() {
    return (
      <ItalyMap width={500} height={500} />
    )
  }
}
