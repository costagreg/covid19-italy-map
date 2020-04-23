import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'
import { Dashboard, FETCH_LATEST_TREND, GET_LATEST_UPDATES } from './Dashboard'

const allRegions = [
  'Abruzzo',
  'Puglia',
  'Basilicata',
  'Calabria',
  'Campania',
  'Emilia-Romagna',
  'Friuli Venezia Giulia',
  'Lazio',
  'Liguria',
  'Lombardia',
  'Marche',
  'Molise',
  'Piemonte',
  'Sardegna',
  'Sicilia',
  'Toscana',
  'P.A. Trento',
  'Umbria',
  'Valle d`Aosta',
  'Veneto',
]

const latestUpdates = {
  date: '1586448000000',
  regions: [
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
  ],
  __typename: 'latestUpdates',
}

const latestTrendParam = {
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
        latestTrendParam,
      },
    },
  },
  {
    request: {
      query: GET_LATEST_UPDATES,
      variables: {},
    },
    result: { data: { latestUpdates } },
  },
]

describe('Dashboard', () => {
  describe('@render', () => {
    it('renders the Dashboard without any error', async () => {
      const { asFragment } = render(
        <MockedProvider mocks={mocks}>
          <Dashboard />
        </MockedProvider>
      )
      await wait(0)

      expect(asFragment()).toMatchSnapshot()
    })

    it('shows Sicilia as default selected region', () => {
      const { queryByTestId } = render(
        <MockedProvider mocks={mocks}>
          <Dashboard />
        </MockedProvider>
      )

      expect(queryByTestId('dataTable-Sicilia')).toBeDefined()
    })

    it('doesnt show any data if region is not present in the data', async () => {
      const { getByTestId, queryByTestId } = render(
        <MockedProvider mocks={mocks}>
          <Dashboard />
        </MockedProvider>
      )

      await wait(0)

      const regionBasilicata = getByTestId('Calabria')

      fireEvent.click(regionBasilicata)

      allRegions.map((region) =>
        expect(queryByTestId(`dataTable-${region}`)).toBeNull()
      )
    })
  })
})
