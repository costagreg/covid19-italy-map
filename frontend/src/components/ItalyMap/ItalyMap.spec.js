import { render, fireEvent } from '@testing-library/react'
import { interpolateReds } from 'd3-scale-chromatic'
import React from 'react'
import ItalyMap from './ItalyMap'

const initProps = {
  width: 100,
  height: 200,
  data: [
      {
        region: 'Sicilia',
        totalCases: 5,
      },
      {
        region: "Valle d'Aosta",
        totalCases: 25,
      },
      {
        region: "Abruzzo",
        totalCases: 10,
      },
      {
        region: "Puglia",
        totalCases: 10,
      },
      {
        region: "Basilicata",
        totalCases: 40,
      },
      {
        region: "Calabria",
        totalCases: 10,
      },
    ],
}

describe('<ItalyMap />', () => {
  describe('@render', () => {
    it('renders the italy map without any error', () => {
      const { asFragment } = render(<ItalyMap {...initProps} />)

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders 20 regions', () => {
      const { container } = render(<ItalyMap {...initProps} />)
      const regions = container.querySelectorAll('path')

      expect(regions.length).toBe(20)
    })

    it('sets width and height of svg depending on props', () => {
      const widthMock = 512
      const heightMock = 600
      const { container } = render(
        <ItalyMap {...initProps} width={widthMock} height={heightMock} />
      )
      const svg = container.querySelector('svg')

      expect(svg).toHaveAttribute('width', `${widthMock}`)
      expect(svg).toHaveAttribute('height', `${heightMock}`)
    })

    it('highlights the region selected', () => {
      const { getByTestId} = render(
        <ItalyMap {...initProps} selectedRegion="Basilicata" />
      )

      const regionBasilicata = getByTestId('Basilicata')
      expect(regionBasilicata).toHaveClass('italyMap__selected')
      expect(regionBasilicata).toHaveAttribute('d')
      expect(regionBasilicata).toHaveAttribute('fill')
    })

    it('fill regions path with a different color depending on intensity', () => {
      const { getByTestId} = render(
        <ItalyMap {...initProps} selectedRegion="Basilicata" />
      )

      expect(getByTestId('Sicilia')).toHaveAttribute('fill', interpolateReds(0.05))
      expect(getByTestId('Valle d\'Aosta')).toHaveAttribute('fill', interpolateReds(0.25))
      expect(getByTestId('Abruzzo')).toHaveAttribute('fill', interpolateReds(0.1))
      expect(getByTestId('Basilicata')).toHaveAttribute('fill', interpolateReds(0.4))
      expect(getByTestId('Calabria')).toHaveAttribute('fill', interpolateReds(0.1))
    })
  })

  describe('@events', () => {
    describe('Selecting a region', () => {
      it('will call selectRegion prop', () => {
        const selectRegionMock = jest.fn()
        const { getByTestId } = render(
          <ItalyMap {...initProps} selectRegion={selectRegionMock} />
        )

        const regionLombardia = getByTestId('Lombardia')

        fireEvent.click(regionLombardia)
        
        expect(selectRegionMock).toHaveBeenCalledWith('Lombardia')
      })
    })
  })
})
