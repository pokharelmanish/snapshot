import React from 'react'
import {shallow} from 'enzyme'
import InfoMessage from 'common/search/InfoMessage'

const render = ({total = 0} = {}) => {
  return shallow(<InfoMessage total={total} />)
}

describe('InfoMessage', () => {
  let component
  beforeEach(() => {
    component = render({})
  })
  describe('layout', () => {
    it('renders a container', () => {
      const container = component.find('.alert-container')
      expect(container.exists()).toBe(true)
    })

    it('sets the correct message for the alert', () => {
      const message = 'No records match your search. Try checking for spelling errors, then try removing some criteria to help broaden your search and click the Search button again.'
      const props = component.find('AlertInfoMessage').props()
      expect(props.message).toEqual(message)
    })
  })

  describe('callbacks', () => {
    describe('handleCloseAlert', () => {
      it('sets the closeAlert state to true', () => {
        expect(component.state().closeAlert).toBe(false)
        const alertInfoMessage = component.find('AlertInfoMessage')
        alertInfoMessage.props().closeAlert()
        expect(component.state().closeAlert).toBe(true)
      })
    })
  })
})
