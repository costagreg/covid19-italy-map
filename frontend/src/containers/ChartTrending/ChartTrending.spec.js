import React from 'react'
import { render, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'
import ChartTrending from './ChartTrending'
import { FETCH_LATEST_TREND } from '../../queries'

const latestTrendParamSicilia = {
  x: [1, 2],
  y: [10, 20],
  __typename: 'xy',
}

const mocks = [
  {
    request: {
      query: FETCH_LATEST_TREND,
      variables: { region: 'Sicilia', param: 'totalCases' },
    },
    result: {
      data: {
        latestTrendParam: latestTrendParamSicilia,
      },
    },
  },
]

describe('ChartTrending', () => {
  describe('@render', () => {
    it('renders ChartTrending without any error', async () => {
      const { asFragment } = render(
        <MockedProvider mocks={mocks}>
          <ChartTrending selectedRegion="Sicilia" selectedParam="totalCases" />
        </MockedProvider>
      )

      await act(() => wait(0))

      expect(asFragment()).toMatchSnapshot()
    })

    it('shows an error message if data hasn not fetched properly', async () => {
      const { findByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: FETCH_LATEST_TREND,
                variables: {},
              },
              error: new Error('Something wrong!'),
            },
          ]}
        >
          <ChartTrending selectedRegion="Sicilia" selectedParam="totalCases" />
        </MockedProvider>
      )

      expect(await findByText('Ops something went wrong')).toBeDefined()
    })
  })
})
