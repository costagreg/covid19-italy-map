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
    uri: process.env.GRAPHQL_URL
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
    const helmet = Helmet.renderStatic()
    const preloadedState = { store: client.extract() }

    return res.send(template(app, helmet, preloadedState))
  }
}
