import React from 'react'
import {shallow} from 'enzyme'
import AlertErrorMessage from 'common/AlertErrorMessage'

const render = ({
  message = '',
  closeAlert = () => {},
} = {}) => shallow(<AlertErrorMessage message={message} closeAlert={closeAlert} />)

describe('AlertErrorMessage', () => {
  describe('layout', () => {
    it('renders a warning icon', () => {
      const component = render()
      const iconContainer = component.find('div.alert-icon')
      const icon = iconContainer.find('i.fa-warning')
      expect(iconContainer.exists()).toBe(true)
      expect(icon.exists()).toBe(true)
    })

    it('renders the message text passed to it', () => {
      const messageText = 'This is a message.'
      const component = render({message: messageText})
      expect(component.text()).toEqual(messageText)
    })

    it('renders an alert cross icon', () => {
      const component = render()
      const iconContainer = component.find('div.alert-cross')
      const icon = iconContainer.find('i.fa-times')
      expect(iconContainer.exists()).toBe(true)
      expect(icon.exists()).toBe(true)
    })
  })

  describe('event handlers', () => {
    describe('onClick', () => {
      describe('alert cross', () => {
        it('calls closeAlert callback', () => {
          const closeAlert = jasmine.createSpy('closeAlert')
          const component = render({closeAlert})
          const alertCross = component.find('div.alert-cross')
          alertCross.simulate('click')
          expect(closeAlert).toHaveBeenCalled()
        })
      })
    })
  })
})
