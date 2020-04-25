import { render, fireEvent} from '@testing-library/react'
import React from 'react'
import DataTable from './DataTable'

const initProps = {
  regionData: {
    region: 'Sicilia',
    hospitalizedWithSymptoms: 566,
    intensiveCare: 63,
    totalHospitalized: 629,
    homeIsolation: 1313,
    totalPositive: 1942,
    totalChangePositive: 49,
    newPositive: 73,
    dischargedHealed: 152,
    totalDeaths: 138,
    totalCases: 2232,
    totalTests: 28742,
  },
  selectParam: () => {},
  selectedParam: 'totalCases',
  updatesDate: 1586448000000,
}

describe('DataTable', () => {
  describe('@render', () => {
    it('renders the DataTable without any error', () => {
      const { asFragment } = render(<DataTable {...initProps} />)

      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('@event', () => {
    it('renders the DataTable without any error', () => {
      const selectParam = jest.fn()
      const { getAllByRole } = render(<DataTable {...initProps} selectParam={selectParam} />)

      const dataRows = getAllByRole('button')

      fireEvent.click(dataRows[0])

      expect(selectParam).toHaveBeenCalled()
    }) 
  })
})
