import React from 'react'
import {shallow} from 'enzyme'
import AlertInfoMessage from 'common/AlertInfoMessage'
import {SafelySurrenderedBabyMessage} from 'views/ScreeningInformationHelpTextBox'

describe('AlertInfoMessage', () => {
  const render = ({
    message = '',
    closeAlert = () => {},
  } = {}) => shallow(<AlertInfoMessage message={message} closeAlert={closeAlert} />)

  it('renders the message text passed to it', () => {
    const messageText = 'Help me Obi-Wan Kenobi'
    const component = render({message: messageText})
    expect(component.text()).toEqual(messageText)
  })

  it('renders the component passed to it', () => {
    const component = render({message: <SafelySurrenderedBabyMessage />})
    expect(component.html()).toContain('<li>Complete all other fields marked as required.</li>')
  })

  describe('layout', () => {
    it('renders a info icon', () => {
      const component = render()
      const iconContainer = component.find('div.alert-icon')
      const icon = iconContainer.find('i.fa-info-circle')
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
      expect(iconContainer.props().role).toBe('button')
      expect(iconContainer.props().tabIndex).toBe('0')
      expect(icon.exists()).toBe(true)
    })
  })

  describe('event handlers', () => {
    describe('alert cross', () => {
      describe('onClick', () => {
        it('calls closeAlert callback', () => {
          const closeAlert = jasmine.createSpy('closeAlert')
          const component = render({closeAlert})
          const alertCross = component.find('div.alert-cross')
          alertCross.simulate('click')
          expect(closeAlert).toHaveBeenCalled()
        })
      })

      describe('onKeyDown', () => {
        it('calls closeAlert callback when Enter key is pressed', () => {
          const event = {keyCode: 13}
          const closeAlert = jasmine.createSpy('closeAlert')
          const component = render({closeAlert})
          const alertCross = component.find('div.alert-cross')
          alertCross.props().onKeyDown(event)
          expect(closeAlert).toHaveBeenCalled()
        })

        it('does not call closeAlert callback when a key other than Enter is pressed', () => {
          const event = {keyCode: 1}
          const closeAlert = jasmine.createSpy('closeAlert')
          const component = render({closeAlert})
          const alertCross = component.find('div.alert-cross')
          alertCross.props().onKeyDown(event)
          expect(closeAlert).not.toHaveBeenCalled()
        })
      })
    })
  })
})
