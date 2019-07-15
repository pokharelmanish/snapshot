import React from 'react'
import PropTypes from 'prop-types'
import PersonSearchNameGroup from 'common/search/PersonSearchNameGroup'
import PersonSearchAdditionalCriteriaGroup from 'common/search/PersonSearchAdditionalCriteriaGroup'
import PersonSearchButtonGroup from 'common/search/PersonSearchButtonGroup'
import {PersonSearchFieldsPropType} from 'data/personSearch'

const PersonSearchFields = ({
  onBlur,
  onChange,
  onCancel,
  onSubmit,
  personSearchFields,
  clientIdError,
  ssnErrors,
  dobErrors,
  isAdvancedSearchOn,
  canSearch,
  onKeyPress,
  onKeyUp,
  onFocus,
  counties,
  total,
  isFetching,
}) => isAdvancedSearchOn ? (
  <div>
    <PersonSearchNameGroup
      onChange={onChange}
      personSearchFields={personSearchFields}
      onKeyPress={onKeyPress}
    />
    <PersonSearchAdditionalCriteriaGroup
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      personSearchFields={personSearchFields}
      clientIdError={clientIdError}
      ssnErrors={ssnErrors}
      dobErrors={dobErrors}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
      counties={counties}
    />
    <PersonSearchButtonGroup
      onSubmit={onSubmit}
      onCancel={onCancel}
      canSearch={canSearch}
      total={total}
      isFetching={isFetching}
    />
  </div>
) : null

PersonSearchFields.propTypes = {
  canSearch: PropTypes.bool,
  clientIdError: PropTypes.array,
  counties: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string,
  })),
  dobErrors: PropTypes.array,
  isAdvancedSearchOn: PropTypes.bool,
  isFetching: PropTypes.bool,
  onBlur: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  personSearchFields: PersonSearchFieldsPropType,
  ssnErrors: PropTypes.array,
  total: PropTypes.number,
}

export default PersonSearchFields
