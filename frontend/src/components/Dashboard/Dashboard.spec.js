import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import Dashboard from './Dashboard'

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

const initProps = {
  data: {
    date: '1586448000000',
    regions: [
      {
        region: 'Sicilia',
        hospitalizedWithSymptoms: 0,
      },
      {
        region: "Valle d'Aosta",
        hospitalizedWithSymptoms: 0,
      },
    ],
  },
}

describe('Dashboard', () => {
  describe('@render', () => {
    it('renders the Dashboard without any error', () => {
      const { asFragment } = render(<Dashboard {...initProps} />)

      expect(asFragment()).toMatchSnapshot()
    })

    it('shows Sicilia as default selected region', () => {
      const { queryByTestId } = render(<Dashboard {...initProps} />)

      expect(queryByTestId('dataTable-Sicilia')).toBeDefined()
    })

    it('doesnt show any data if region is not present in the data', () => {
      const { getByTestId, queryByTestId } = render(<Dashboard {...initProps} />)

      const regionBasilicata = getByTestId('Basilicata')

      fireEvent.click(regionBasilicata)

      allRegions.map((region) => expect(queryByTestId(`dataTable-${region}`)).toBeNull())
    })
  })
})
