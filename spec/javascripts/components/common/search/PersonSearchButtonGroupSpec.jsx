import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchButtonGroup from 'common/search/PersonSearchButtonGroup'

const render = ({
  onCancel = () => {},
  onSubmit = () => {},
  canSearch = false,
  total = 1,
} = {}) =>
  shallow(
    <PersonSearchButtonGroup
      onCancel={onCancel}
      onSubmit={onSubmit}
      canSearch={canSearch}
      total={total}
    />
  )

describe('PersonSearchButtonGroup', () => {
  it('renders the person-search-button-group row', () => {
    const component = render()
    const row = component.find('div.person-search-button-group.row')
    expect(row.exists()).toEqual(true)
  })

  it('renders search button', () => {
    const component = render()
    const searchButton = component.find('button.person-search-button.search')
    expect(searchButton.text()).toEqual('Search')
  })

  it('renders clear button', () => {
    const component = render()
    const clearButton = component.find('button.person-search-button.clear')
    expect(clearButton.text()).toEqual('Clear')
  })

  it('calls onSubmit when search button is clicked', () => {
    const onSubmit = jasmine.createSpy('onClick')
    const component = render({onSubmit})
    const searchButton = component.find('button.person-search-button.search')
    searchButton.simulate('click')
    expect(onSubmit).toHaveBeenCalled()
  })

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = jasmine.createSpy('onCancel')
    const component = render({onCancel})
    const cancelButton = component.find('button.person-search-button.clear')
    cancelButton.simulate('click')
    expect(onCancel).toHaveBeenCalled()
  })

  it('search button gets enabled when canSearch props is true', () => {
    const component = render({canSearch: true})
    expect(component.find('button.person-search-button.search').props().disabled).toBeFalsy()
  })

  it('search button gets disabled when canSearch props is false', () => {
    const component = render({canSearch: false})
    expect(component.find('button.person-search-button.search').props().disabled).toBeTruthy()
  })
})
