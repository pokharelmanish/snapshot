import React from 'react'
import PropTypes from 'prop-types'
import CardView from 'views/CardView'
import {SHOW_MODE} from 'actions/screeningPageActions'
import SearchResultsTable from 'common/search/SearchResultsTable'

const PersonSearchResults = (
  {
    total,
    personSearchFields,
    onLoadMoreResults,
    setCurrentPageNumber,
    setCurrentRowNumber,
    results,
    resultsSubset,
    currentRow,
    onAuthorize,
  }) => {
  const resultsLimit = 250
  const totalResults = total > resultsLimit ? '250+' : total
  const title = `Search Results (${totalResults} records found)`
  return (
    <CardView
      id="person-search-results-card"
      title={title}
      mode={SHOW_MODE}
      show={
        <SearchResultsTable
          results={results}
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
