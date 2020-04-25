import React from 'react'
import { format } from 'date-fns'
import classnames from 'classnames'

import { params } from '../../constants'
import './DataTable.scss'

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
          key={name}
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
        The data above are updated on {updatesDateFormated}
      </div>
    </div>
  )
}
