import React from 'react'
import {shallow} from 'enzyme'
import AlertMessageResultsLimit from 'common/search/AlertMessageResultsLimit'

const render = ({total = 0} = {}) => {
  return shallow(<AlertMessageResultsLimit total={total} />)
}

describe('AlertMessageResultsLimit', () => {
  describe('layout', () => {
    let component
    beforeEach(() => {
      component = render({total: 251})
    })

    it('renders a container', () => {
      const container = component.find('.alert-container')
      expect(container.exists()).toBe(true)
    })

    describe('AlertErrorMessage', () => {
      describe('when the total results are greater than 250', () => {
        describe('and closeAlert is false', () => {
          it('renders an AlertErrorMessage', () => {
            const alertMessage = component.find('AlertErrorMessage')
            expect(alertMessage.exists()).toBe(true)
          })
        })

        describe('and closeAlert is true', () => {
          it('does not render an AlertErrorMessage', () => {
            component.setState({closeAlert: true})
            const alertMessage = component.find('AlertErrorMessage')
            expect(alertMessage.exists()).toBe(false)
          })
        })
      })

      describe('when the total results are 250 or less', () => {
        it('does not render an AlertErrorMessage', () => {
          const component = render({total: 250})
          const alertMessage = component.find('AlertErrorMessage')
          expect(alertMessage.exists()).toBe(false)
        })
      })
    })

    it('sets the correct message for the alert', () => {
      const message = 'Over 250 search results have been found. If possible, please refine your search by adding additional search criteria, then click the "Search" button again.'
      const props = component.find('AlertErrorMessage').props()
      expect(props.message).toEqual(message)
    })
  })

  describe('callbacks', () => {
    describe('handleCloseAlert', () => {
      it('sets the closeAlert state to true', () => {
        const component = render({total: 251})
        expect(component.state().closeAlert).toBe(false)
        const alertErrorMessage = component.find('AlertErrorMessage')
        alertErrorMessage.props().closeAlert()
        expect(component.state().closeAlert).toBe(true)
      })
    })
  })
})
