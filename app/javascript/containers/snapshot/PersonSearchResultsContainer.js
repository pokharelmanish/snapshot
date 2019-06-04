import {connect} from 'react-redux'
import PersonSearchResults from 'common/search/PersonSearchResults'
import {
  selectResultsTotalValue,
  selectPersonSearchFields,
  selectSearchResultsSubset,
  selectSearchResultsCurrentRow,
} from 'selectors/peopleSearchSelectors'
import {
  loadMoreResults,
  setSearchCurrentPage,
  setSearchCurrentRow,
} from 'actions/peopleSearchActions'

const mapStateToProps = state => {
  return {
    total: selectResultsTotalValue(state),
    personSearchFields: selectPersonSearchFields(state),
    resultsSubset: selectSearchResultsSubset(state),
    currentRow: selectSearchResultsCurrentRow(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onLoadMoreResults = (personSearchFields, totalResultsReceived) => {
    dispatch(loadMoreResults(true, true, personSearchFields, totalResultsReceived))
  }
  const setCurrentPageNumber = (pageNumber) => {
    dispatch(setSearchCurrentPage(pageNumber))
  }
  const setCurrentRowNumber = (pageNumber) => {
    dispatch(setSearchCurrentRow(pageNumber))
  }
  return {onLoadMoreResults, setCurrentPageNumber, setCurrentRowNumber, dispatch}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonSearchResults)
