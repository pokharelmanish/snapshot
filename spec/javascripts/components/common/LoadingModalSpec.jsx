import React from 'react'
import {shallow} from 'enzyme'
import LoadingModal from 'common/LoadingModal'

const render = ({
  show = true,
  size = 'default',
  title = '',
} = {}) => shallow(<LoadingModal show={show} size={size} title={title} />)

describe('LoadingModal', () => {
  describe('layout', () => {
    it('renders a ModalComponent', () => {
      const component = render({})
      const modalComponent = component.find('ModalComponent')
      expect(modalComponent.exists()).toBe(true)
    })

    it('sets props on the modal component', () => {
      const props = {
        show: true,
        size: 'large',
        title: 'a title',
      }
      const component = render(props)
      const modalComponent = component.find('ModalComponent')
      const modalComponentProps = modalComponent.props()
      expect(modalComponentProps.showModal).toBe(props.show)
      expect(modalComponentProps.modalSize).toBe(props.size)
      expect(modalComponentProps.modalTitle).toBe(props.title)
    })
  })
})
