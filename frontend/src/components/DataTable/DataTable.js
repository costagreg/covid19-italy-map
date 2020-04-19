import React from 'react'
import { format } from 'date-fns'
import './DataTable.scss'

export default function DataTable({ updatesDate,  regionData, selectParam }) {
  const updatesDateFormated = format(updatesDate, 'MMMM dd yyyy')

  return (
    <div data-testid={`dataTable-${regionData['region']}`} className='dataTable'>
      <div className='dataTable__header'>
        {regionData['region']}
      </div>
      {/*TO-DO: use map for below*/}
      <div className='dataTable__row' onClick={() => selectParam('hospitalizedWithSymptoms')}>
        <div className='dataTable__col'>Hospitalized With Symptoms</div>
        <div className='dataTable__col'>{regionData['hospitalizedWithSymptoms']}</div>
      </div>
      <div className='dataTable__row'>
        <div className='dataTable__col' onClick={() => selectParam('intensiveCare')}>Intensive Cares</div>
        <div className='dataTable__col'>{regionData['intensiveCare']}</div>
      </div>
      <div className='dataTable__row'>
        <div className='dataTable__col'>Total Hospitalized</div>
        <div className='dataTable__col'>{regionData['totalHospitalized']}</div>
      </div>
      <div className='dataTable__row'>
        <div className='dataTable__col'>Home Isolation</div>
        <div className='dataTable__col'>{regionData['homeIsolation']}</div>
      </div>
      <div className='dataTable__row'>
        <div className='dataTable__col'>Total Positive</div>
        <div className='dataTable__col'>{regionData['totalPositive']}</div>
      </div>
      <div className='dataTable__row'>
        <div className='dataTable__col'>Total Change Positive</div>
        <div className='dataTable__col'>{regionData['totalChangePositive']}</div>
      </div>
      <div className='dataTable__row'>
        <div className='dataTable__col'>New Positive</div>
        <div className='dataTable__col'>{regionData['newPositive']}</div>
      </div>
      <div className='dataTable__row'>
        <div className='dataTable__col'>Discharged Healed</div>
        <div className='dataTable__col'>{regionData['dischargedHealed']}</div>
      </div>
      <div className='dataTable__row'>
        <div className='dataTable__col'>Total Deaths</div>
        <div className='dataTable__col'>{regionData['totalDeaths']}</div>
      </div>
      <div className='dataTable__row'>
        <div className='dataTable__col'>Total Cases</div>
        <div className='dataTable__col'>{regionData['totalCases']}</div>
      </div>
      <div className='dataTable__row'>
        <div className='dataTable__col'>Total Tests</div>
        <div className='dataTable__col'>{regionData['totalTests']}</div>
      </div>
      <div className='dataTable__rowDate'>The data above are update on {updatesDateFormated}</div>
    </div>
  )
}
