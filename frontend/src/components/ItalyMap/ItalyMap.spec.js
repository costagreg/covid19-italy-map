import { render, cleanup } from "@testing-library/react";
import React from 'react'
import ItalyMap from './ItalyMap'

const initProps = {
  width: 100,
  height: 200,
}

describe('ItalyMap', () => {
  describe('@render', () => {
    it('renders the italy map without any error', () => {
      const { asFragment } = render(<ItalyMap {...initProps} />);

      expect(asFragment()).toMatchSnapshot();
    })

    it('renders 20 regions', () => {
      const { container } = render(<ItalyMap {...initProps} />);
      const regions = container.querySelectorAll('path')
    
      expect(regions.length).toBe(20);
    })

    it('sets width and height of svg depending on props', () => {
      const widthMock = 512
      const heightMock = 600
      const { container } = render(<ItalyMap width={widthMock} height={heightMock} />);
      const svg = container.querySelector('svg')
    
      expect(svg).toHaveAttribute('width', `${widthMock}`)
      expect(svg).toHaveAttribute('height', `${heightMock}`)
    })
  })
})