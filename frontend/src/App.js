import PropTypes from 'prop-types'
import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import './App.scss'

const GET_UPDATES = gql`
  {
    allUpdatesRegion {
      date
      region
      totalCases
    }
  }
`

export default class App extends Component {
  render() {
    return (
      <Query query={GET_UPDATES}>
        {({ loading, error, data }) => {
          return <div>{console.log(data)} Test</div>
        }}
      </Query>
    )
  }
}
