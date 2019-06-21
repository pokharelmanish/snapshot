import React from 'react'
import {shallow} from 'enzyme'
import DateOfBirthTableHeader from 'common/search/DateOfBirthTableHeader'

describe('DateOfBirthTableHeader', () => {
  describe('layout', () => {
    let component
    beforeEach(() => {
      component = shallow(<DateOfBirthTableHeader />)
    })

    it('renders a TableHeader', () => {
      expect(component.exists()).toBe(true)
    })

    it('sets props on TableHeader', () => {
      const props = component.props()
      expect(props.id).toBe('dob')
      expect(props.title).toBe('Date of Birth')
      expect(props.withTooltip).toBe(true)
      expect(props.tooltipContent[0]).toBe('Approximate DOB')
      expect(props.tooltipContent[1]).toBe('A tilde (~) indicates Date of Birth is approximate')
    })
  })
})
