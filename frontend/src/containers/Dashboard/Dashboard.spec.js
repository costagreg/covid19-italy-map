import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'
import Dashboard from './Dashboard'
import { FETCH_LATEST_UPDATES, FETCH_LATEST_TREND } from '../../queries'
import { today } from '../../utils'
import { act } from 'react-dom/test-utils'

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

const latestTrendParamSicilia = {
  x: [1, 2],
  y: [10, 20],
  __typename: 'xy',
}

const latestTrendParamBasilicata = {
  x: [10, 23],
  y: [30, 4],
  __typename: 'xy',
}

const mocks = [
  {
    request: {
      query: FETCH_LATEST_TREND,
      variables: { date: today(), region: 'Sicilia', param: 'totalCases' },
    },
    result: {
      data: {
        latestTrendParam: latestTrendParamSicilia,
      },
    },
  },
  {
    request: {
      query: FETCH_LATEST_TREND,
      variables: { date: today(), region: 'Basilicata', param: 'totalCases' },
    },
    result: {
      data: {
        latestTrendParam: latestTrendParamBasilicata,
      },
    },
  },
  {
    request: {
      query: FETCH_LATEST_UPDATES,
      variables: { date: today()},
    },
    result: { data: { latestUpdates } },
  },
]

describe('Dashboard', () => {
  describe('@render', () => {
    it.only('renders the Dashboard without any error', async () => {
      const { asFragment, queryByText, debug } = render(
        <MockedProvider mocks={mocks}>
          <Dashboard />
        </MockedProvider>
      )

      await act(() => wait(1000))

      debug()

      expect(queryByText('Ops something went wrong')).toBeNull()

      expect(asFragment()).toMatchSnapshot()
    })

    it('shows Sicilia as default selected region', async () => {
      const { findByTestId } = render(
        <MockedProvider mocks={mocks}>
          <Dashboard />
        </MockedProvider>
      )

      await act(() => wait(10))

      expect(await findByTestId('dataTable-Sicilia')).toBeDefined()
      expect(await findByTestId('chartTrending-Sicilia')).toBeDefined()
    })

    it('shows totalCases as default param', async () => {
      const { findByTitle } = render(
        <MockedProvider mocks={mocks}>
          <Dashboard />
        </MockedProvider>
      )

      await act(() => wait(10))

      expect(await findByTitle('Casi totali')).toHaveClass(
        'dataTable__rowSelected'
      )
    })

    it('shows an error message if data hasn not fetched properly', async () => {
      const { findByText} = render(
        <MockedProvider mocks={[{
          request: {
            query: FETCH_LATEST_UPDATES,
            variables: { date: today()},
          },
          error: new Error("Something wrong!")
        }]}>
          <Dashboard />
        </MockedProvider>
      )

      expect(await findByText('Ops something went wrong')).toBeDefined()
    })
  })

  describe('@event', () => {
    describe('click region', () => {
      it('shows table data for that region', async () => {
        const { debug, findByTestId, queryByTestId } = render(
          <MockedProvider mocks={mocks}>
            <Dashboard />
          </MockedProvider>
        )

        const region = await findByTestId('Basilicata')

        fireEvent.click(region)

        await act(() => wait(1000))

        expect(await findByTestId('dataTable-Basilicata')).toBeDefined()
        expect(queryByTestId('dataTable-Sicilia')).toBeNull()
      })
    })
  })
})
