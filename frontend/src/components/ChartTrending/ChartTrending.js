import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import { scaleBand, scaleLinear, scale } from 'd3-scale'
import { range, max, min } from 'd3-array'
import { line, curveCatmullRom } from 'd3-shape'
import { format } from 'date-fns'
import './ChartTrending.scss'

const ToolTip = ({ xPos, yPos, xValue, yValue, label }) => (
  <foreignObject x={xPos} y={yPos} width="40%" height={1}>
    <div className="toolTip">
      <div className="toolTip__yValue">
        <b>{label}</b>: {yValue}
      </div>
      <div className="toolTip__xValue">{xValue}</div>
    </div>
  </foreignObject>
)

export default class ChartTrending extends Component {
  state = {
    pointHovered: null,
  }
  render() {
    const { pointHovered } = this.state
    const {
      xAxis,
      yAxis,
      chartWidth,
      chartHeight,
      margin = [0, 0, 0, 0],
      selectedParam,
    } = this.props

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

    const xTicks = xAxisScale.ticks(6).map((d) =>
      xAxis[d] ? (
        <g
          transform={`translate(${xAxisScale(d)},${chartHeight -
            marginBottom})`}
        >
          <text className="chartTrending__xTicksText">
            {format(new Date(+xAxis[d]), 'dd/MM')}
          </text>
          <line
            className="chartTrending__xTicksLine"
            x1="0"
            x1="0"
            y1="0"
            y2="5"
          />
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
              x1={marginLeft}
              x2={chartWidth - marginRight}
              y1={chartHeight - marginBottom}
              y2={chartHeight - marginBottom}
            />
          </g>
          <g>
            <path className="chartTrending__line" d={chartLine(yAxis)} />
            {yAxis.map((d, i) => (
              <Fragment>
                <circle
                  className={classnames([
                    'chartTrending__circle',
                    { chartTrending__circleSelected: i === pointHovered },
                  ])}
                  cx={xAxisScale(i)}
                  cy={yAxisScale(d)}
                  r={2}
                />
                <circle
                  cx={xAxisScale(i)}
                  cy={yAxisScale(d)}
                  r={10}
                  fill="transparent"
                  onMouseOver={() => {
                    console.log(i)
                    this.setState({ pointHovered: i })
                  }}
                  onMouseOut={() => {
                    console.log('out', i)
                    this.setState({ pointHovered: null })
                  }}
                />
              </Fragment>
            ))}
          </g>
          {xTicks}
          {pointHovered ? (
            <ToolTip
              xPos={xAxisScale(pointHovered)}
              yPos={yAxisScale(yAxis[pointHovered])}
              xValue={format(new Date(+xAxis[pointHovered]), 'dd/MM/yy')}
              yValue={yAxis[pointHovered]}
              label={selectedParam}
            />
          ) : null}
        </svg>
      </div>
    )
  }
}

ChartTrending.defaultProps = {
  xAxis: [],
  yAxis: [],
}
