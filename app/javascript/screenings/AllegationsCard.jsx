import CardContainer from 'containers/screenings/CardContainer'
import AllegationsShowContainer from 'containers/screenings/AllegationsShowContainer'
import React from 'react'

const AllegationsCard = () =>
  <CardContainer
    title='Allegations'
    id='allegations-card'
    show={<AllegationsShowContainer />}
  />

export default AllegationsCard
