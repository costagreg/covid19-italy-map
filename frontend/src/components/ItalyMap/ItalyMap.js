import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { geoPath, geoAlbers, geoCentroid } from 'd3-geo'
import { interpolateReds } from 'd3-scale-chromatic'

import { feature } from 'topojson-client'

import italyTopology from './italyTopology.json'
import './ItalyMap.scss'

class ItalyMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      geographies: [],
    }

    this.refMap = React.createRef()
  }

  componentDidMount() {
    this.setState({
      geographies: feature(italyTopology, italyTopology.objects.ITA_adm1)
        .features,
    })
  }

  onClick = (region) => {
    const { selectRegion } = this.props

    selectRegion(region)
  }

  calcPercentage = (field) => {
    const { data } = this.props
    const sum = data.reduce((tot, regionData) => tot + regionData[field], 0)

    const percentages = data.reduce((obj, regionData) => {
      obj[regionData['region']] = regionData[field] / sum

      return obj
    }, {})

    return percentages
  }

  render() {
    const { geographies } = this.state
    const { width, height, data, selectedRegion } = this.props

    const projection = geoAlbers()
      .center([0, 41])
      .rotate([347, 0])
      .parallels([35, 45])
      .scale(4000)
      .translate([width / 2, height / 1.8])

    const percentages = this.calcPercentage('totalCases')

    const geoRegion = geographies.find(
      (region) => region.properties.NAME_1 === selectedRegion
    )

    return (
      <svg
        ref={this.refMap}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="italyMap"
      >
        <g>
          {geographies.map((d, i) => {
            const region = d.properties.NAME_1

            return (
              <path
                data-testid={region}
                key={`path-${i}`}
                d={geoPath().projection(projection)(d)}
                className={classnames('italyMap__region')}
                fill={interpolateReds(percentages[region])}
                onClick={() => this.onClick(region)}
              />
            )
          })}
        {geoRegion && <path
          d={geoPath().projection(projection)(geoRegion)}
          className={classnames('italyMap__region', 'italyMap__selected')}
        />}
      </g>
      </svg>
    )
  }
}

ItalyMap.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default ItalyMap
