import React from 'react'
import PropTypes from 'prop-types'
import CardView from 'views/CardView'
import {SHOW_MODE} from 'actions/screeningPageActions'
import SearchResultsTable from 'common/search/SearchResultsTable'

const PersonSearchResults = (
  {
    results,
    total,
    personSearchFields,
    onLoadMoreResults,
    setCurrentPageNumber,
    setCurrentRowNumber,
    resultsSubset,
    currentRow,
    onAuthorize,
  }) => {
  const title = `Search Results (${total || '0'} records found)`
  return (
    <CardView
      id="person-search-results-card"
      title={title}
      mode={SHOW_MODE}
      show={
        <SearchResultsTable
          resultsSubset={resultsSubset}
          total={total}
          personSearchFields={personSearchFields}
          onLoadMoreResults={onLoadMoreResults}
          setCurrentPageNumber={setCurrentPageNumber}
          setCurrentRowNumber={setCurrentRowNumber}
          currentRow={currentRow}
          onAuthorize={onAuthorize}
        />
      }
    />
  )
}

PersonSearchResults.propTypes = {
  currentRow: PropTypes.number,
  onAuthorize: PropTypes.func,
  onLoadMoreResults: PropTypes.func,
  personSearchFields: PropTypes.object,
  results: PropTypes.array,
  resultsSubset: PropTypes.array,
  setCurrentPageNumber: PropTypes.func,
  setCurrentRowNumber: PropTypes.func,
  total: PropTypes.number,
}

export default PersonSearchResults
