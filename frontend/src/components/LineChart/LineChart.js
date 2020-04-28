import React, { Component, Fragment, useRef, useEffect } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { scaleLinear } from 'd3-scale'
import { max, min } from 'd3-array'
import { line, curveCatmullRom } from 'd3-shape'
import { format } from 'date-fns'

import './LineChart.scss'

export const ToolTip = ({
  xPos,
  yPos,
  xValue,
  yValue,
  label,
  chartWidth,
  chartHeight,
  toolTipWidth,
  toolTipHeight,
}) => {
  xPos =
    xPos + toolTipWidth < chartWidth
      ? xPos + 10
      : chartWidth - (toolTipWidth + 20)
  yPos =
    yPos + toolTipHeight < chartHeight
      ? yPos + 10
      : chartHeight - (toolTipHeight + 20)

  return (
    <foreignObject
      data-testid="toolTip"
      x={xPos}
      y={yPos}
      width="200"
      height={100}
    >
      <div className="toolTip">
        <div className="toolTip__yValue">
          <b className="toolTip__yValueLabel">{label}</b>:
          <span className="toolTip__yValueText">{yValue}</span>
        </div>
        <div className="toolTip__xValue">{xValue}</div>
      </div>
    </foreignObject>
  )
}

class LineChart extends Component {
  state = {
    pointHovered: -1,
  }
  render() {
    const { pointHovered } = this.state
    const { xAxis, yAxis, chartWidth, chartHeight, margin, yLabel } = this.props

    const [marginTop, marginRight, marginBottom, marginLeft] = margin

    const xAxisScale = scaleLinear()
      .domain([0, xAxis.length - 1])
      .range([marginLeft, chartWidth - marginRight])

    const yAxisScale = scaleLinear()
      .domain([Math.min(min(yAxis), 0), max(yAxis)])
      .range([chartHeight - marginBottom, marginTop])

    const chartLine = line()
      .x((d, i) => xAxisScale(i))
      .y((d) => yAxisScale(d))
      .curve(curveCatmullRom.alpha(0.5))

    // console.log(yAxis)

    const xTicks = xAxisScale.ticks(6).map((d) =>
      xAxis[d] ? (
        <g
          key={xAxis[d]}
          transform={`translate(${xAxisScale(d)},${chartHeight -
            marginBottom})`}
        >
          <text className="lineChart__xTicksText">
            {format(new Date(+xAxis[d]), 'dd/MM')}
          </text>
          <line
            className="lineChart__xTicksLine"
            x1="0"
            x1="0"
            y1="0"
            y2="5"
          />
        </g>
      ) : null
    )

    return (
      <div className="lineChart">
        <svg
          width={chartWidth}
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          <g>
            <line
              className="lineChart__xAxis"
              x1={marginLeft}
              x2={chartWidth - marginRight}
              y1={chartHeight - marginBottom}
              y2={chartHeight - marginBottom}
            />
          </g>
          <g>
            <path className="lineChart__line" d={chartLine(yAxis)} />
            {yAxis.map((d, i) => (
              <g
                key={xAxis[i]}
                transform={`translate(${xAxisScale(i)},${yAxisScale(d)})`}
              >
                <circle
                  className={classnames([
                    'lineChart__circle',
                    { lineChart__circleSelected: i === pointHovered },
                  ])}
                  r={2}
                />
                <circle
                  data-testid="dataPoint"
                  r={10}
                  fill="transparent"
                  onMouseOver={() => {
                    this.setState({ pointHovered: i })
                  }}
                  onMouseOut={() => {
                    this.setState({ pointHovered: -1 })
                  }}
                />
              </g>
            ))}
          </g>
          {xTicks}
          {pointHovered >= 0 ? (
            <ToolTip
              xPos={xAxisScale(pointHovered)}
              yPos={yAxisScale(yAxis[pointHovered])}
              xValue={format(new Date(+xAxis[pointHovered]), 'dd/MM/yy')}
              yValue={yAxis[pointHovered]}
              label={yLabel}
              chartWidth={chartWidth}
              chartHeight={chartHeight}
              toolTipWidth={200}
              toolTipHeight={100}
            />
          ) : null}
        </svg>
      </div>
    )
  }
}

LineChart.protoTypes = {
  xAxis: PropTypes.arrayOf(PropTypes.number).isRequired,
  yAxis: PropTypes.arrayOf(
    PropTypes.oneOf([PropTypes.string, PropTypes.number])
  ).isRequired,
  chartWidth: PropTypes.number.isRequired,
  chartHeight: PropTypes.number.isRequired,
  margin: PropTypes.arrayOf(PropTypes.number),
  yLabel: PropTypes.arrayOf(PropTypes.string),
}

LineChart.defaultProps = {
  margin: [0, 0, 0, 0],
  yLabel: '',
}

export default LineChart