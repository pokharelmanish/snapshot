import React from 'react'
import {shallow} from 'enzyme'
import AlertMessageResultsLimit from 'common/search/AlertMessageResultsLimit'

const render = ({total = 0} = {}) => {
  return shallow(<AlertMessageResultsLimit total={total} />)
}

describe('layout', () => {
  let component
  beforeEach(() => {
    component = render({total: 251})
  })

  it('renders a container', () => {
    const container = component.find('.alert-container')
    expect(container.exists()).toBe(true)
  })

  it('does not render an AlertErrorMessage when results are 250 or less', () => {
    const component = render({total: 250})
    const alertMessage = component.find('AlertErrorMessage')
    expect(alertMessage.exists()).toBe(false)
  })

  it('renders an AlertErrorMessage when results are 250 or more', () => {
    const alertMessage = component.find('AlertErrorMessage')
    expect(alertMessage.exists()).toBe(true)
  })

  it('sets the correct message for the alert', () => {
    const message = 'Over 250 search results have been found. If possible, please refine your search by adding additional search criteria, then click the "Search" button again.'
    const props = component.find('AlertErrorMessage').props()
    expect(props.message).toEqual(message)
  })
})
