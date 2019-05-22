import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {dateFormatter} from 'utils/dateFormatter'
import {capitalizedStr} from 'utils/textFormatter'
import {Link} from 'react-router'

class SearchResultsTable extends Component {
  columns = [
    {
      Header: '',
      id: 'row',
      maxWidth: 50,
      filterable: false,
      Cell: (row) => {
        return `${row.index + 1}.`
      },
    },
    {
      id: 'name',
      Header: 'Name',
      accessor: 'fullName',
      Cell: (row) => {
        const person = row.original
        const id = person.legacyDescriptor && person.legacyDescriptor.legacy_id
        return <Link to={`/snapshot/detail/${id}`}>{person.fullName}</Link>
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
      accessor: null,
    },
    {
      Header: 'Service Provider Phone',
      accessor: null,
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
      accessor: null,
    },
  ]

  render() {
    const {results} = this.props
    return (
      <ReactTable
        data={results}
        columns={this.columns}
        defaultPageSize={25}
        minRows={0}
      />
    )
  }
}

SearchResultsTable.propTypes = {
  results: PropTypes.array,
}

export default SearchResultsTable
