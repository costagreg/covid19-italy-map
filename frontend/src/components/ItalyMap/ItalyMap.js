import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { geoPath, geoAlbers } from 'd3-geo'
import { interpolateReds } from 'd3-scale-chromatic'

import { feature } from 'topojson-client'

import italyTopology from './italyTopology.json'
import './ItalyMap.scss'

const Region = memo(
  ({ projection, region, percentages, geoboundaries, isSelected, onClick = () => {} }) => (
    <path
      data-testid={region}
      d={geoPath().projection(projection)(geoboundaries)}
      className={classnames('italyMap__region', {
        italyMap__selected: isSelected,
      })}
      fill={interpolateReds(percentages[region])}
      onClick={() => onClick(region)}
    >
      <title>{region}</title>
    </path>
  )
)

const geographies = feature(italyTopology, italyTopology.objects.ITA_adm1)
  .features

const calcPercentage = (field, data) => {
  const sum = data.reduce((tot, regionData) => tot + regionData[field], 0)

  const percentages = data.reduce((obj, regionData) => {
    obj[regionData['region']] = regionData[field] / sum

    return obj
  }, {})

  return percentages
}

function ItalyMap({ width, height, data, selectRegion, selectedRegion }) {
  const projection = useMemo(() => geoAlbers()
    .center([0, 41])
    .rotate([347, 0])
    .parallels([35, 45])
    .scale((3000 * width)/600)
    .translate([width / 2, height / 1.9]), [width, height])

  const percentages = useMemo(() => calcPercentage('totalCases', data), [data])

  const geoSelectedRegion = useMemo(
    () =>
      geographies.find((region) => region.properties.NAME_1 === selectedRegion),
    [selectedRegion]
  )

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="italyMap"
      data-testid="italyMap"
    >
      <g>
        {geographies.map((d, i) => {
          const region = d.properties.NAME_1
          return region !== selectedRegion ? (
            <Region
              key={region}
              geoboundaries={d}
              projection={projection}
              region={region}
              percentages={percentages}
              onClick={() => {
                selectRegion(region)
              }}
            />
          ) : null
        })}
        {geoSelectedRegion && (
          <Region
            key={selectedRegion}
            geoboundaries={geoSelectedRegion}
            projection={projection}
            region={selectedRegion}
            percentages={percentages}
            isSelected
          />
        )}
      </g>
    </svg>
  )
}

ItalyMap.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  selectRegion: PropTypes.func.isRequired,
  selectedRegion: PropTypes.string.isRequired,
}

export default ItalyMap
