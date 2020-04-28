import React from 'react'
import DashboardView from './DashboardView'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'
import { render, act, fireEvent } from '@testing-library/react'
import { FETCH_LATEST_TREND } from '../../queries'
// jest
// .spyOn(React, 'useRef')
// .mockReturnValue({
//   current: { offsetWidth: 500, offsetHeight: 400 },
// })

const regions = [
  {
    region: 'Sicilia',
    hospitalizedWithSymptoms: 0,
    intensiveCare: 0,
    totalHospitalized: 0,
    homeIsolation: 0,
    totalPositive: 0,
    totalChangePositive: 0,
    newPositive: 0,
    dischargedHealed: 0,
    totalDeaths: 0,
    totalCases: 0,
    totalTests: 0,
    __typename: 'updateRegion',
  },
  {
    region: 'Basilicata',
    hospitalizedWithSymptoms: 0,
    intensiveCare: 0,
    totalHospitalized: 0,
    homeIsolation: 0,
    totalPositive: 0,
    totalChangePositive: 0,
    newPositive: 0,
    dischargedHealed: 0,
    totalDeaths: 0,
    totalCases: 0,
    totalTests: 0,
    __typename: 'updateRegion',
  },
]

const props = {
  selectedRegion: 'Sicilia',
  selectedParam: 'totalCases',
  selectRegion: () => {},
  selectParam: () => {},
  selectedRegionData: regions[0],
  regions,
  date: '1586448000000',
}

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

describe('Dashboard View', () => {
  describe('@render', () => {
    it('renders the Dashboard without any error', async () => {
      const { asFragment } = render(
        <MockedProvider mocks={mocks}>
          <DashboardView {...props} />
        </MockedProvider>
      )

      await act(() => wait(0))

      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('@event', () => {
    describe('onResize', () => {
      it('will resize the map accordingly id when div change size', async () => {
        const { findByTestId } = render(
          <MockedProvider mocks={mocks}>
            <DashboardView {...props} />
          </MockedProvider>
        )

        expect(await findByTestId('italyMap')).toHaveAttribute('width', '0')
        expect(await findByTestId('italyMap')).toHaveAttribute('height', '0')

        act(() => {
          Object.defineProperties(window.HTMLElement.prototype, {
            offsetHeight: {
              get: function() {
                return 100
              },
            },
            offsetWidth: {
              get: function() {
                return 500
              },
            },
          })

          window.dispatchEvent(new Event('resize'))
        })

        expect(await findByTestId('italyMap')).toHaveAttribute('width', '500')
        expect(await findByTestId('italyMap')).toHaveAttribute('height', '100')
      })
    })
  })
})
