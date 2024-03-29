import React from 'react'
import {shallow} from 'enzyme'
import PersonCardHeader from 'views/people/PersonCardHeader'

describe('PersonCardHeader', () => {
  let onDelete
  let onEdit

  beforeEach(() => {
    onDelete = jasmine.createSpy('onDelete')
    onEdit = jasmine.createSpy('onEdit')
  })

  function renderComponent({title = 'J Doe', showEdit = true, showDelete = true, informationFlag = null, informationPill = null, participants = []}) {
    const props = {informationFlag, title, showDelete, showEdit, informationPill, onEdit, onDelete, participants}
    return shallow(<PersonCardHeader {...props} />, {disableLifecycleMethods: true})
  }

  it('renders a header element', () => {
    const component = renderComponent({title: 'Alex'})
    expect(component.find('h2').length).toEqual(1)
  })

  it('renders a Remove button when participants is more than one', () => {
    const component = renderComponent({participants: [{id: '1'}, {id: '2'}]})
    expect(component.find('button[aria-label="Remove person"]').length).toBe(1)
    expect(component.find('button').text()).toEqual('Remove')
  })

  it('doesnot render Remove button when participants is less than one', () => {
    const component = renderComponent({participants: [{id: '1'}]})
    expect(component.find('button[aria-label="Remove person"]').length).toBe(0)
  })

  it('displays the name passed in the props', () => {
    const component = renderComponent({title: 'Alex'})
    expect(component.text()).toContain('Alex')
  })

  describe('participant flag', () => {
    it('does not render a flag element if no flag is present', () => {
      const component = renderComponent({informationFlag: null})
      const informationFlag = component.find('span').filter('.information-flag')
      expect(informationFlag.exists()).toEqual(false)
    })

    it('displays the flag if one is passed', () => {
      const component = renderComponent({informationFlag: 'Sensitive'})
      const informationFlag = component.find('div').filter('.information-flag-rounded')
      expect(informationFlag.exists()).toEqual(true)
      expect(informationFlag.text()).toEqual('Sensitive')
    })
  })
  describe('deceased flag', () => {
    it('does not render a deceased flag element if no flag is present', () => {
      const component = renderComponent({informationPill: null})
      const informationPillFlag = component.find('span').filter('.information-flag-rounded')
      expect(informationPillFlag.exists()).toEqual(false)
    })

    it('displays the flag if one is passed', () => {
      const component = renderComponent({informationPill: 'Deceased'})
      const informationPillFlag = component.find('div').filter('.information-flag-rounded')
      expect(informationPillFlag.exists()).toEqual(true)
      expect(informationPillFlag.text()).toEqual('Deceased')
    })
  })

  describe('edit button', () => {
    it('displays if the card is editable', () => {
      const component = renderComponent({showEdit: true})
      expect(component.find('EditLink').exists()).toEqual(true)
    })

    it('calls the onEdit function from the props when clicked', () => {
      const component = renderComponent({showEdit: true})
      const event = jasmine.createSpyObj('event', ['preventDefault'])
      const editLink = component.find('EditLink')
      editLink.simulate('click', event)
      expect(onEdit).toHaveBeenCalled()
    })

    it('does not render if the card is not editable', () => {
      const component = renderComponent({showEdit: false})
      expect(component.find('EditLink').exists()).toEqual(false)
    })
  })

  describe('delete button', () => {
    it('displays if showDelete is true', () => {
      const component = renderComponent({showDelete: true, participants: [{id: '1'}, {id: '2'}]})
      const deleteButton = component.find('button[aria-label="Remove person"]')
      expect(deleteButton.exists()).toEqual(true)
    })

    it('calls the onDelete function from the props when clicked', () => {
      const component = renderComponent({showEdit: true, participants: [{id: '1'}, {id: '2'}]})
      const deleteButton = component.find('button[aria-label="Remove person"]')
      deleteButton.simulate('click')
      expect(onDelete).toHaveBeenCalled()
    })

    it('does not display if showDelete is false', () => {
      const component = renderComponent({showDelete: false})
      const deleteButton = component.find('button[aria-label="Remove person"]')
      expect(deleteButton.exists()).toEqual(false)
    })
  })
})
