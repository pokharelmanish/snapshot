import React from 'react'
import {SnapshotDetailPage, mapDispatchToProps} from 'snapshots/SnapshotDetailPage'
import {shallow} from 'enzyme'
import {clearSnapshot} from 'actions/snapshotActions'
import {clearPeople, createSnapshotPerson} from 'actions/personCardActions'
import {clearHistoryOfInvolvement} from 'actions/historyOfInvolvementActions'
import {clearRelationships} from 'actions/relationshipsActions'

describe('SnapshotDetailPage', () => {
  const render = ({participants = [], params = {}, ...args}, disableLifecycleMethods = true) => {
    const props = {participants, params, ...args}
    return shallow(<SnapshotDetailPage {...props} />, {disableLifecycleMethods})
  }

  it('renders PageHeader with title and no button', () => {
    const page = render({})
    const header = page.find('Connect(PageHeader)')
    expect(header.exists()).toBe(true)
    expect(header.props().pageTitle).toEqual('Snapshot')
    expect(header.props().button).toEqual(null)
  })

  it('renders a BreadCrumb with crumbs', () => {
    const page = render({params: {id: '1'}})
    const breadCrumb = page.find('Connect(BreadCrumb)')
    const crumbs = breadCrumb.props().navigationElements
    expect(breadCrumb.exists()).toBe(true)
    expect(crumbs.length).toEqual(2)
    expect(crumbs[0].props.children).toBe('Snapshot')
    expect(crumbs[0].props.to).toBe('/snapshot')
    expect(crumbs[1]).toBe('Detail')
  })

  it('renders a person card for each participant', () => {
    const participants = [{id: '3'}, {id: '5'}]
    const page = render({participants})
    expect(page.find('PersonCardView').length).toEqual(2)
  })

  it('renders a RelationshipsCardContainer', () => {
    const page = render({})
    const relationshipsContainer = page.find('Connect(RelationshipsCard)')
    expect(relationshipsContainer.exists()).toBe(true)
  })

  it('renders history of involvement', () => {
    const page = render({})
    expect(page.find('Connect(HistoryOfInvolvement)').exists()).toBe(true)
  })

  it('calls the clearSnapshot and createSnapshot Person on mount', () => {
    const clearSnapshot = jasmine.createSpy('clearSnapshot')
    const createSnapshotPerson = jasmine.createSpy('createSnapshotPerson')
    render({params: {id: '1'}, clearSnapshot, createSnapshotPerson}, false)
    expect(clearSnapshot).toHaveBeenCalled()
    expect(createSnapshotPerson).toHaveBeenCalledWith('1')
  })

  it('calls the unmount prop when the component is unmounted', () => {
    const unmount = jasmine.createSpy('unmount')
    const page = render({unmount})
    page.unmount()
    expect(unmount).toHaveBeenCalled()
  })

  describe('mapDispatchToProps', () => {
    describe('clearSnapshot', () => {
      it('dispatches clearSnapshot action', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const props = mapDispatchToProps(dispatch)
        props.clearSnapshot()
        expect(dispatch).toHaveBeenCalledWith(clearSnapshot())
      })
    })

    describe('createSnapshotPerson', () => {
      it('dispatches createSnapshotPerson action', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const props = mapDispatchToProps(dispatch)
        props.createSnapshotPerson()
        expect(dispatch).toHaveBeenCalledWith(createSnapshotPerson())
      })
    })

    describe('unmount', async() => {
      const dispatch = jasmine.createSpy('dispatch')
      const props = mapDispatchToProps(dispatch)
      await props.unmount()
      expect(dispatch).toHaveBeenCalledWith(clearPeople())
      expect(dispatch).toHaveBeenCalledWith(clearHistoryOfInvolvement())
      expect(dispatch).toHaveBeenCalledWith(clearRelationships())
      expect(dispatch).toHaveBeenCalledWith(clearSnapshot())
    })
  })
})
