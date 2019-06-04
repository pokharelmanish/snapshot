import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {dateFormatter} from 'utils/dateFormatter'
import {capitalizedStr} from 'utils/textFormatter'
import {Link} from 'react-router'
import ReactTooltip from 'react-tooltip'
import {phoneNumberFormatter} from 'utils/phoneNumberFormatter'
import AlertMessageResultsLimit from 'common/search/AlertMessageResultsLimit'

class SearchResultsTable extends React.Component {
  constructor() {
    super()
    this.state = {
      previousPage: -1,
    }
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidUpdate() {
    ReactTooltip.rebuild()
  }

  columns = [
    {
      Header: '',
      id: 'row',
      maxWidth: 50,
      filterable: false,
      className: 'search-results',
      Cell: (row) => {
        return `${(row.page * row.pageSize) + row.index + 1}.`
      },
    },
    {
      id: 'name',
      Header: 'Name',
      accessor: 'fullName',
      Cell: (row) => {
        const person = row.original
        const id = person.legacyDescriptor && person.legacyDescriptor.legacy_id
        const isSealed = person.isSealed ? 'disabled-cursor' : ''
        return (
          <div>
            {<Link className={isSealed} to={`/snapshot/detail/${id}`}>{person.fullName}</Link>}
            {person.isSensitive && <span data-tip="Sensitive">&nbsp;<i className="fa fa-circle search-information-flag" aria-hidden="true"/></span>}
            {person.isSealed && <span data-tip="Sealed">&nbsp;<i className="fa fa-circle search-information-flag" aria-hidden="true"/></span>}
            <ReactTooltip className="custom-tool-tip" />
          </div>
        )
      },
    },
    {
      Header: 'Date of Birth',
      accessor: 'dateOfBirth',
      Cell: (row) => dateFormatter(row.original.dateOfBirth),
    },
    {
      Header: 'Sex at Birth',
      accessor: 'gender',
      Cell: (row) => capitalizedStr(row.original.gender),
    },
    {
      Header: 'Service Provider County',
      accessor: 'spCounty',
    },
    {
      Header: 'Service Provider Phone',
      accessor: 'spPhone',
      Cell: (row) => phoneNumberFormatter(row.original.spPhone),
    },
    {
      id: 'address',
      Header: 'Address',
      accessor: (result) => {
        const address = result.address
        return address ?
          `${address.streetAddress}, ${address.city}, ${address.state} ${address.zip}` :
          ''
      },
    },
    {
      Header: 'Case Status',
      accessor: 'caseStatus',
    },
  ]

  fetchData(pageIndex) {
    const {setCurrentPageNumber, onLoadMoreResults, personSearchFields, results} = this.props
    const previousPage = this.state.previousPage
    const currentPage = pageIndex + 1
    const totalResultsReceived = results.length
    setCurrentPageNumber(currentPage)
    if (currentPage > previousPage) {
      onLoadMoreResults(personSearchFields, totalResultsReceived)
    }
    this.setState({previousPage: pageIndex})
  }

  setRowAndFetchData(pageSize, pageIndex) {
    const {
      setCurrentRowNumber,
      setCurrentPageNumber,
      onLoadMoreResults,
      personSearchFields,
      results,
    } = this.props
    const currentPage = pageIndex + 1
    const totalResultsReceived = results.length
    setCurrentRowNumber(pageSize)
    setCurrentPageNumber(currentPage)
    onLoadMoreResults(personSearchFields, totalResultsReceived)
  }

  render() {
    const {resultsSubset, total, currentRow} = this.props
    return (
      <Fragment>
        <AlertMessageResultsLimit total={total} />
        <ReactTable
          columns={this.columns}
          manual
          data={resultsSubset}
          minRows={0}
          pages={Math.ceil(total / currentRow)}
          onPageChange={(pageIndex) => this.fetchData(pageIndex)}
          defaultPageSize={currentRow}
          onPageSizeChange={(pageSize, pageIndex) => this.setRowAndFetchData(pageSize, pageIndex)}
        />
      </Fragment>
    )
  }
}

SearchResultsTable.propTypes = {
  currentRow: PropTypes.number,
  onLoadMoreResults: PropTypes.func,
  personSearchFields: PropTypes.object,
  results: PropTypes.array,
  resultsSubset: PropTypes.array,
  setCurrentPageNumber: PropTypes.func,
  setCurrentRowNumber: PropTypes.func,
  total: PropTypes.number,
}

export default SearchResultsTable
