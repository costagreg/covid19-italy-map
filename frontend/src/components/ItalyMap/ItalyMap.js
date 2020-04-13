import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { geoPath, geoAlbers } from 'd3-geo'

import { feature } from 'topojson-client'

import italyTopology from './italyTopology.json'
import "./ItalyMap.scss";

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

  render() {
    const { geographies } = this.state
    const { width, height } = this.props

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
      >
        <g>
          {geographies.map((d, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(projection)(d)}
              className="region"
              fill={'#ccc'}
              stroke="#FFFFFF"
              strokeWidth={0.3}
            />
          ))}
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
