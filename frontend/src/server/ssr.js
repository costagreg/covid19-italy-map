import React from 'react'
import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'

import { InMemoryCache } from 'apollo-cache-inmemory'
import ReactDOMServer from 'react-dom/server'
import { Helmet } from 'react-helmet'
import App from '../App'

import template from './template.js'

const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: createHttpLink({
    credentials: 'include',
    fetch,
    uri: 'http://localhost:3001/graphql'
  })
})

export default function serverRenderer() {
  return async (req, res) => {
    const app = ReactDOMServer.renderToString(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    )

    await getDataFromTree(App)
    console.log('----------------')
    console.log(client.extract())
    const helmet = Helmet.renderStatic()
    const preloadedState = { store: client.extract() }

    console.log(preloadedState)


    return res.send(template(app, helmet, preloadedState))
  }
}
