import React from 'react'
import {shallow} from 'enzyme'
import AttachLink from 'common/relationship/AttachLink'

describe('AttachLink', () => {
  const defaultProps = {
    isScreening: true,
    screeningId: '1',
    relationship: {
      name: 'Gohan',
      type: 'son',
      person_card_exists: true,
      legacy_descriptor: {legacy_id: '1'},
    },
  }
  const renderAttachLink = (
    participants = [],
    pendingPeople = [],
    onClick = () => {}
  ) => {
    const props = {
      onClick,
      participants,
      pendingPeople,
      ...defaultProps,
    }
    return shallow(<AttachLink {...props} />)
  }

  it('renders a link Attach when it returns an element ', () => {
    expect(renderAttachLink().find('a').length).toBe(1)
  })

  describe('if the relationship is in the participants list', () => {
    it('does not generate any dom element', () => {
      expect(renderAttachLink(['1']).type()).toBe(null)
    })
  })

  describe('if the relationship is in the pendingPeople list', () => {
    it('does not generate any dom element', () => {
      expect(renderAttachLink([], ['1']).type()).toBe(null)
    })
  })

  it('calls onClick when the Attach Link is clicked', () => {
    const onClick = jasmine.createSpy('onClick')
    renderAttachLink([], [], onClick).simulate('click')
    expect(onClick).toHaveBeenCalled()
    expect(onClick).toHaveBeenCalledWith(
      {
        name: 'Gohan',
        type: 'son',
        person_card_exists: true,
        legacy_descriptor: {legacy_id: '1'},
      },
      '1'
    )
  })

  it('has href and aria-label', () => {
    expect(
      renderAttachLink()
        .find('a[aria-label="Attach Relationship"]')
        .props().href
    ).toBe('#relationships-list')
  })
})
