import React from 'react'
import { format } from 'date-fns'
import classnames from 'classnames'

import './DataTable.scss'

const params = [
  {
    name: 'hospitalizedWithSymptoms',
    label: 'Hospitalized With Symptoms',
  },
  {
    name: 'intensiveCare',
    label: 'Intensive Cares',
  },
  {
    name: 'totalHospitalized',
    label: 'Total Hospitalized',
  },
  {
    name: 'homeIsolation',
    label: 'Home Isolation',
  },

  {
    name: 'totalPositive',
    label: 'Total Positive',
  },
  {
    name: 'totalChangePositive',
    label: 'Total Change Positive',
  },
  {
    name: 'newPositive',
    label: 'New Positive',
  },
  {
    name: 'dischargedHealed',
    label: 'Discharged Healed',
  },
  {
    name: 'totalDeaths',
    label: 'Total Deaths',
  },
  {
    name: 'totalCases',
    label: 'Total Cases',
  },
  {
    name: 'totalTests',
    label: 'Total Tests',
  },
]

export default function DataTable({
  updatesDate,
  regionData,
  selectParam,
  selectedParam,
}) {
  const updatesDateFormated = format(updatesDate, 'MMMM dd yyyy')

  return (
    <div
      data-testid={`dataTable-${regionData['region']}`}
      className="dataTable"
    >
      <div className="dataTable__header">{regionData['region']}</div>
      {params.map(({ name, label }) => (
        <div
          role="button"
          className={classnames('dataTable__row', {
            dataTable__rowSelected: selectedParam === name,
          })}
          onClick={() => selectParam(name)}
        >
          <div className="dataTable__col">{label}</div>
          <div className="dataTable__col">{regionData[name]}</div>
        </div>
      ))}

      <div className="dataTable__rowDate">
        The data above are update on {updatesDateFormated}
      </div>
    </div>
  )
}
