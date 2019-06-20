import React from 'react'
import {shallow} from 'enzyme'
import CountyTableHeader from 'common/search/CountyTableHeader'

describe('CountyTableHeader', () => {
  describe('layout', () => {
    let component
    beforeEach(() => {
      component = shallow(<CountyTableHeader />)
    })

    it('renders a TableHeader', () => {
      expect(component.exists()).toBe(true)
    })

    it('sets props on TableHeader', () => {
      const props = component.props()
      expect(props.id).toBe('county')
      expect(props.title).toBe('County')
      expect(props.withTooltip).toBe(true)
      expect(props.tooltipContent[0]).toBe('Service Providing County')
      expect(props.tooltipContent[1]).toBe('The county that has most recently served this person')
    })
  })
})
