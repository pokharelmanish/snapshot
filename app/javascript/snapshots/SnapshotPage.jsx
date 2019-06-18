import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {
  clear as clearSearch,
  resetPersonSearch,
} from 'actions/peopleSearchActions'
import {viewSnapshotDetail} from 'actions/snapshotActions'
import PersonSearchFormContainer from 'containers/common/PersonSearchFormContainer'
import PageHeader from 'common/PageHeader'
import {selectParticipants} from 'selectors/participantSelectors'
import BreadCrumb from 'containers/common/BreadCrumb'
import {getHasGenericErrorValueSelector} from 'selectors/errorsSelectors'
import PersonSearchResultsContainer from 'containers/snapshot/PersonSearchResultsContainer'
import {selectPeopleResults} from 'selectors/peopleSearchSelectors'
import {isAdvancedSearchOn} from 'common/config'

export class SnapshotPage extends React.Component {
  startOverButton() {
    const {startOver} = this.props
    return (
      <button
        type="button"
        className="btn primary-btn pull-right"
        disabled={false}
        onClick={startOver}
      >
        Start Over
      </button>
    )
  }

  onSelectPerson(person) {
    const id = person.legacyDescriptor && person.legacyDescriptor.legacy_id
    this.props.viewSnapshotDetail(id)
  }

  renderBody() {
    const {location} = this.props
    const advancedSearchFeatureFlag = isAdvancedSearchOn(location)
    return (
      <div className="col-md-12 col-xs-12 snapshot-inner-container">
        <div className="row">
          <PersonSearchFormContainer
            onSelect={person => this.onSelectPerson(person)}
            searchPrompt="Search for clients"
            canCreateNewPerson={false}
            isClientOnly={true}
          />
          {advancedSearchFeatureFlag && <PersonSearchResultsContainer />}
        </div>
      </div>
    )
  }

  renderBreadCrumbs() {
    return <BreadCrumb navigationElements={['Snapshot']}/>
  }

  render() {
    const {hasGenericErrors} = this.props
    const genericErrorClass = hasGenericErrors ? 'generic-error' : ''
    return (
      <div>
        <div>
          <PageHeader pageTitle="Snapshot" button={this.startOverButton()} />
          {this.renderBreadCrumbs()}
        </div>
        <div className={`container snapshot-container ${genericErrorClass}`}>
          <div className="row">
            {this.renderBody()}
          </div>
        </div>
      </div>
    )
  }
}

SnapshotPage.propTypes = {
  hasGenericErrors: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  participants: PropTypes.array,
  results: PropTypes.array,
  startOver: PropTypes.func,
  viewSnapshotDetail: PropTypes.func,
}

const mapStateToProps = state => ({
  hasGenericErrors: getHasGenericErrorValueSelector(state),
  participants: selectParticipants(state).toJS(),
  results: selectPeopleResults(state).toJS(),
})

export const mapDispatchToProps = dispatch => ({
  startOver: () => {
    dispatch(clearSearch('results'))
    dispatch(resetPersonSearch())
  },
  viewSnapshotDetail: (id) => dispatch(viewSnapshotDetail(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapshotPage)
