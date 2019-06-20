import React from 'react'
import TableHeader from 'common/TableHeader'

const CountyTableHeader = () => {
  const tooltipContent = ['Service Providing County', 'The county that has most recently served this person']
  const props = {
    id: 'county',
    title: 'County',
    withTooltip: true,
    tooltipContent,
  }
  return (<TableHeader {...props} />)
}

export default CountyTableHeader
