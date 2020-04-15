import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { geoPath, geoAlbers } from 'd3-geo'

import { feature } from 'topojson-client'

import italyTopology from './italyTopology.json'
import './ItalyMap.scss'

// TO-DO: Move this to dashboard js
// HEre in APP just use query and pass data to dashboard
// Easy MPV: in the map shows total cases. When they click show all data
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

  render() {
    const { geographies } = this.state
    const { width, height, data, selectedRegion } = this.props

    const projection = geoAlbers()
      .center([0, 41])
      .rotate([347, 0])
      .parallels([35, 45])
      .scale(4000)
      .translate([width / 2, height / 1.8])

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
                className={classnames('italyMap__region', {
                  italyMap__selected: region === selectedRegion,
                })}
                onClick={() => this.onClick(region)}
              />
            )
          })}
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
