import React from 'react'
import TableHeader from 'common/TableHeader'

const DateOfBirthTableHeader = () => {
  const tooltipContent = ['Approximate DOB', 'A tilde (~) indicates Date of Birth is approximate']
  const props = {
    id: 'dob',
    title: 'Date of Birth',
    withTooltip: true,
    tooltipContent,
  }
  return (<TableHeader {...props} />)
}

export default DateOfBirthTableHeader
