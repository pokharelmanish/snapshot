import React from 'react'
import ModalComponent from 'common/ModalComponent'
import {shallow} from 'enzyme'

describe('ModalComponent', () => {
  const wrapper = shallow(<ModalComponent />)

  it('has a Modal', () => {
    expect(wrapper.find('Modal').length).toBe(1)
  })
  it('has a ModalHeader', () => {
    expect(wrapper.find('ModalHeader').length).toBe(1)
  })
  it('has a h2', () => {
    expect(wrapper.find('h2').length).toBe(1)
  })
  it('has a ModalBody', () => {
    expect(wrapper.find('ModalBody').length).toBe(1)
  })
  it('has a ModalFooter', () => {
    expect(wrapper.find('ModalFooter').length).toBe(1)
  })
})
