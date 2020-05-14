import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import LineChart, { ToolTip } from './LineChart'

jest.mock('../../constants', () => ({
  params: { labelMock: 'label' },
}))

describe('LineChart', () => {
  const initProps = {
    xAxis: [1586448000000, 1586534400000, 1586620800000],
    yAxis: [100, 120, 110],
    chartWidth: 300,
    chartHeight: 200,
    margin: [0, 0, 0, 0],
    yLabel: 'labelMock',
  }

  describe('@render', () => {
    it('renders LineChart without any error', () => {
      const { asFragment } = render(<LineChart {...initProps} />)

      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('@events', () => {
    it('shows the tooltip when user hover mouse over to a data point', () => {
      const { getAllByTestId, debug, queryByText } = render(
        <LineChart {...initProps} />
      )

      const datePoints = getAllByTestId('dataPoint')

      expect(queryByText('label')).toBeNull()
      expect(queryByText(`${initProps.yAxis[0]}`)).toBeNull()

      fireEvent.mouseOver(datePoints[0])

      expect(queryByText('label')).toBeTruthy()
      expect(queryByText(`${initProps.yAxis[0]}`)).toBeTruthy()
      expect(queryByText(`${initProps.yAxis[1]}`)).toBeNull()
      expect(queryByText(`${initProps.yAxis[2]}`)).toBeNull()
    })

    it('hide the tooltip when user hover mouse out to a data point', () => {
      const { getAllByTestId, queryByText } = render(
        <LineChart {...initProps} />
      )

      const datePoints = getAllByTestId('dataPoint')

      expect(queryByText('label')).toBeNull()
      expect(queryByText(`${initProps.yAxis[2]}`)).toBeNull()

      fireEvent.mouseOver(datePoints[2])

      expect(queryByText('label')).toBeTruthy()
      expect(queryByText(`${initProps.yAxis[0]}`)).toBeNull()
      expect(queryByText(`${initProps.yAxis[1]}`)).toBeNull()
      expect(queryByText(`${initProps.yAxis[2]}`)).toBeTruthy()

      fireEvent.mouseOut(datePoints[2])

      expect(queryByText('label')).toBeNull()
      expect(queryByText(`${initProps.yAxis[2]}`)).toBeNull()
    })
  })
})

describe('ToolTip', () => {
  const isToolTipNotCropped = (toolTip, { chartWidth, chartHeight }) => {
    const xPosToolTip = parseInt(toolTip.getAttribute('x'))
    const yPosToolTip = parseInt(toolTip.getAttribute('y'))

    expect(xPosToolTip).toBeLessThanOrEqual(chartWidth)
    expect(yPosToolTip).toBeLessThanOrEqual(chartHeight)
    expect(xPosToolTip).toBeGreaterThanOrEqual(0)
    expect(yPosToolTip).toBeGreaterThanOrEqual(0)
  }

  describe('@render', () => {
    const initProps = {
      xPos: 10,
      yPos: 20,
      xValue: '12/06/1992',
      yValue: 60,
      label: 'test',
      chartWidth: 300,
      chartHeight: 200,
      toolTipWidth: 50,
      toolTipHeight: 50,
    }

    it('renders the ToolTip without any error', () => {
      const { asFragment } = render(<ToolTip {...initProps} />)

      expect(asFragment()).toMatchSnapshot()
    })

    it('does not crop the tooltip if datapoint is close to left top edge', () => {
      const props = {
        ...initProps,
        xPos: 0,
        yPos: 0,
      }

      const { getByTestId } = render(<ToolTip {...props} />)

      isToolTipNotCropped(getByTestId('toolTip'), props)
    })

    it('does not crop the tooltip if datapoint is close to right top edge', () => {
      const props = {
        ...initProps,
        xPos: 290,
        yPos: 10,
      }

      const { getByTestId } = render(<ToolTip {...props} />)

      isToolTipNotCropped(getByTestId('toolTip'), props)
    })

    it('does not crop the tooltip if datapoint is close to right bottom edge', () => {
      const props = {
        ...initProps,
        xPos: 290,
        yPos: 190,
      }

      const { getByTestId } = render(<ToolTip {...props} />)

      isToolTipNotCropped(getByTestId('toolTip'), props)
    })

    it('does not crop the tooltip if datapoint is close to left bottom edge', () => {
      const props = {
        ...initProps,
        xPos: 10,
        yPos: 190,
      }

      const { getByTestId } = render(<ToolTip {...props} />)

      isToolTipNotCropped(getByTestId('toolTip'), props)
    })
  })
})
