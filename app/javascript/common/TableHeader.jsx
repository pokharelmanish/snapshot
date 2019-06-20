import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

const renderTooltip = (id, withTooltip, tooltipContent) => {
  return withTooltip ? (
    <Fragment>
      <i data-tip data-for={id} className="fa fa-info-circle" aria-hidden="true"/>
      <ReactTooltip id={id} aria-haspopup='true' className="custom-tool-tip">
        <span className='tooltip-content'>
          {tooltipContent.map((content, index) => <p key={`${id}-tooltip-content-${index}`}>{content}</p>)}
        </span>
      </ReactTooltip>
    </Fragment>
  ) : null
}

const TableHeader = ({id, title, withTooltip, tooltipContent}) => {
  return (
    <div className='table-header'>
      <span className='table-header-title'>{title}</span>
      {renderTooltip(id, withTooltip, tooltipContent)}
    </div>
  )
}

TableHeader.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  tooltipContent: PropTypes.arrayOf(PropTypes.string),
  withTooltip: PropTypes.bool,
}

export default TableHeader
