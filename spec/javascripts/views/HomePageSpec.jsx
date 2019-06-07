import {HomePage} from 'views/homePage'
import React from 'react'
import {shallow} from 'enzyme'

describe('HomePage', () => {
  it('displays the snapshot button', () => {
    const props = {snapshot: true, actions: {}}
    const homePage = shallow(<HomePage {...props}/>)
    const pageHeader = homePage.find('Connect(PageHeader)')
    const buttons = shallow(pageHeader.props().button)
    expect(buttons.text()).toContain('Start Snapshot')
  })
  it('renders a BreadCrumb', () => {
    const props = {snapshot: true, hotline: true, actions: {}}
    const homePage = shallow(<HomePage {...props}/>)
    expect(homePage.find('Connect(BreadCrumb)').exists()).toBe(true)
  })
})
