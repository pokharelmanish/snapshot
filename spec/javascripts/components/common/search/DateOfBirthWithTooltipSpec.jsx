import DateOfBirthWithTooltip from 'common/search/DateOfBirthWithTooltip'
import React from 'react'
import {shallow} from 'enzyme'

describe('DateOfBirthWithTooltip', () => {
  const component = shallow(
    <DateOfBirthWithTooltip />, {disableLifecycleMethods: true}
  )

  it('renders DateOfBirthWithTooltip', () => {
    expect(component.exists()).toBe(true)
    expect(component.find('span').at(0).text()).toBe('Date of Birth ')
    expect(component.find('ReactTooltip').html()).toContain('A tilde (~) indicates Date of Birth is')
  })
})
