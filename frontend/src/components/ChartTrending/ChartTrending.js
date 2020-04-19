import React, { Component } from 'react'
import { scaleBand, scaleLinear, scale } from 'd3-scale'
import { range, max } from 'd3-array'
import { line, curveCatmullRom } from 'd3-shape'

// import { axisBottom } from 'd3-axis'

import './ChartTrending.scss'
const combineXY = (X, Y) =>
  X.reduce((acc, v, i) => {
    console.log(acc)
    acc.push([X[i], Y[i]])
    return acc
  }, [])

export default class ChartTrending extends Component {
  render() {
    const { xAxis, yAxis, chartWidth, chartHeight, marginBottom } = this.props

    const xAxisScale = scaleLinear()
      .domain([0, xAxis.length - 1])
      .range([0, chartWidth])

    const yAxisScale = scaleLinear()
      .domain([0, max(yAxis)])
      .range([chartHeight, marginBottom])

    const chartLine = line()
      .x((d, i) => xAxisScale(i))
      .y((d) => yAxisScale(d))
      .curve(curveCatmullRom.alpha(0.5))

    const xTicks = xAxisScale.ticks(3).map((d) =>
      xAxis[d] ? (
        <g transform={`translate(${xAxisScale(d)},${chartHeight - marginBottom})`}>
          <text className="chartTrending__xTicksText">{xAxis[d]}</text>
          <line className="chartTrending__xTicksLine" x1="0" x1="0" y1="0" y2="5" />
        </g>
      ) : null
    )

    return (
      <div className="chartTrending">
        <svg
          width={chartWidth}
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          <g>
            <line
              className="chartTrending__xAxis"
              x1={0}
              x2={chartWidth}
              y1={chartHeight - marginBottom }
              y2={chartHeight - marginBottom}
            />
          </g>
          <g>
            <path className="chartTrending__line" d={chartLine(yAxis)} />
          </g>
          {xTicks}
        </svg>
      </div>
    )
  }
}
