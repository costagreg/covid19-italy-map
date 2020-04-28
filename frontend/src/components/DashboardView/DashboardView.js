import React, { useEffect, useState, useRef } from 'react'
import propTypes from 'prop-types'
import ItalyMap from '../../components/ItalyMap'
import DataTable from '../../components/DataTable'
import ChartTrending from '../../containers/ChartTrending'

import './DashboardView.scss'

const ResponsiveDiv = ({ className, children }) => {
  const divRef = React.useRef()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const { current } = divRef

    const onResize = () => {
      setWidth(current.offsetWidth)
      setHeight(current.offsetHeight)
    }
    
    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className={className} style={{ position: 'relative' }}>
      <div
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        ref={divRef}
        className={className}
      >
        {children(width, height)}
      </div>
    </div>
  )
}

const DashboardView = ({
  selectedRegion,
  selectedParam,
  selectRegion,
  selectParam,
  selectedRegionData,
  regions,
  date,
}) => (
  <main className="dashboardView">
    <ResponsiveDiv className="dashboardView__italyMap">
      {(width, height) => (
        <ItalyMap
          width={width}
          height={height}
          data={regions}
          selectedRegion={selectedRegion}
          selectRegion={selectRegion}
        />
      )}
    </ResponsiveDiv>
    <section className="dashboardView__dataTable">
      {selectedRegionData && (
        <DataTable
          updatesDate={+date}
          regionData={selectedRegionData}
          selectParam={selectParam}
          selectedParam={selectedParam}
        />
      )}
      <section className="dashboardView__chartTrending">
        <ChartTrending
          selectedRegion={selectedRegion}
          selectedParam={selectedParam}
        />
      </section>
    </section>
  </main>
)

DashboardView.propTypes = {
  selectedRegion: propTypes.string.isRequired,
  selectedParam: propTypes.string.isRequired,
  selectRegion: propTypes.func.isRequired,
  selectParam: propTypes.func.isRequired,
  selectedRegionData: propTypes.object.isRequired,
  regions: propTypes.array.isRequired,
  date: propTypes.string.isRequired,
}

export default DashboardView
