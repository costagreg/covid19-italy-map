import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import ItalyMap from './ItalyMap'

const initProps = {
  width: 100,
  height: 200,
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
        <ItalyMap width={widthMock} height={heightMock} />
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
      expect(regionBasilicata.classList.contains('italyMap__selected')).toBe(true)
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
