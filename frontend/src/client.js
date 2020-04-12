import React from 'react'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { hydrate } from 'react-dom'

import App from './App'

const preloadedStore = window.__PRELOADED_STATE__.store
delete window.__PRELOADED_STATE__ 

const client = new ApolloClient({
  cache: new InMemoryCache().restore(preloadedStore),
  link: new HttpLink({
    credentials: 'include',
    uri: 'http://localhost:3001/graphql'
  })
})

const render = (App) => {
  hydrate(  
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept()
}
