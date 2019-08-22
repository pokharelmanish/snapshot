import React from 'react'
import PropTypes from 'prop-types'

const attachLink = (onClick, relationship, maybeId) => (
  <a
    href="#relationships-list"
    aria-label="Attach Relationship"
    className="hidden-print"
    onClick={() => {
      onClick(relationship, maybeId)
    }}
  >
    &nbsp;Attach
  </a>
)

const isPending = (relationship, pendingPeople) =>
  pendingPeople.some(
    id =>
      id ===
      (relationship.legacy_descriptor &&
        relationship.legacy_descriptor.legacy_id)
  )

const isParticipant = (relationship, participants) =>
  participants.some(
    id =>
      id ===
      (relationship.legacy_descriptor &&
        relationship.legacy_descriptor.legacy_id)
  )

export const AttachLink = ({
  isScreening,
  onClick,
  participants = [],
  pendingPeople,
  relationship,
  screeningId,
}) => {
  if (
    relationship.person_card_exists &&
    !isPending(relationship, pendingPeople) &&
    !isParticipant(relationship, participants)
  ) {
    return isScreening ?
      attachLink(onClick, relationship, screeningId) :
      attachLink(onClick, relationship)
  } else {
    return null
  }
}

AttachLink.propTypes = {
  isScreening: PropTypes.bool,
  onClick: PropTypes.func,
  participants: PropTypes.arrayOf(PropTypes.string),
  pendingPeople: PropTypes.arrayOf(PropTypes.string),
  relationship: PropTypes.object,
  screeningId: PropTypes.string,
}

export default AttachLink
