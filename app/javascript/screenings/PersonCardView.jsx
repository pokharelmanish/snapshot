import PersonCardContainer from 'containers/screenings/PersonCardContainer'
import PersonPhoneNumbersContainer from 'containers/screenings/PersonPhoneNumbersContainer'
import PersonShowContainer from 'containers/screenings/PersonShowContainer'
import PersonAddressesContainer from 'containers/screenings/PersonAddressesContainer'
import PersonReadOnlyAddressesContainer from 'containers/screenings/PersonReadOnlyAddressesContainer'
import PropTypes from 'prop-types'
import React from 'react'

const PersonCardView = ({personId}) => (
  <PersonCardContainer
    personId={personId}
    edit={
      <div>
        <PersonReadOnlyAddressesContainer personId={personId} />
      </div>
    }
    show={
      <div>
        <PersonShowContainer personId={personId} />
      </div>
    }
  />
)

PersonCardView.propTypes = {
  personId: PropTypes.string.isRequired,
}

export default PersonCardView
