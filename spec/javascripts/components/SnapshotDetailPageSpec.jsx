import React from 'react'
import {SnapshotDetailPage, mapDispatchToProps} from 'snapshots/SnapshotDetailPage'
import {shallow} from 'enzyme'
import {clearSnapshot, viewSnapshotSearch} from 'actions/snapshotActions'
import {clearPeople, createSnapshotPerson} from 'actions/personCardActions'
import {clearHistoryOfInvolvement} from 'actions/historyOfInvolvementActions'
import {clearRelationships} from 'actions/relationshipsActions'

const render = ({participants = [], params = {}, ...args}, disableLifecycleMethods = true) => {
  const props = {participants, params, ...args}
  return shallow(<SnapshotDetailPage {...props} />, {disableLifecycleMethods})
}

describe('SnapshotDetailPage', () => {
  describe('layout', () => {
    it('renders PageHeader with title and back to results button', () => {
      const page = render({})
      const header = page.find('Connect(PageHeader)')
      expect(header.exists()).toBe(true)
      expect(header.props().pageTitle).toEqual('Snapshot')
      expect(header.props().button.type).toEqual('button')
      expect(header.props().button.props.children).toEqual('Back to Results')
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

    describe('details', () => {
      describe('when there are participant details', () => {
        let page
        const participants = [{id: '3'}, {id: '5'}]
        beforeEach(() => {
          page = render({participants})
        })

        it('renders the participant detail card', () => {
          expect(page.find('PersonCardView').exists()).toBe(true)
        })

        it('renders a relationships card', () => {
          expect(page.find('Connect(RelationshipsCard)').exists()).toBe(true)
        })

        it('renders a history of involvement card', () => {
          expect(page.find('Connect(HistoryOfInvolvement)').exists()).toBe(true)
        })
      })

      describe('when there are no participant details', () => {
        let page
        const participants = []
        beforeEach(() => {
          page = render({participants})
        })

        it('does not render the participant detail card', () => {
          expect(page.find('PersonCardView').exists()).toBe(false)
        })

        it('does not render a relationships card', () => {
          expect(page.find('Connect(RelationshipsCard)').exists()).toBe(false)
        })

        it('does not render a history of involvement card', () => {
          expect(page.find('Connect(HistoryOfInvolvement)').exists()).toBe(false)
        })
      })
    })
  })

  describe('event handlers', () => {
    describe('when go back to results button is clicked', () => {
      it('calls goBackToResults', () => {
        const goBackToResults = jasmine.createSpy('goBackToResults')
        const page = render({goBackToResults})
        const header = page.find('Connect(PageHeader)')
        const goBackButton = header.props().button
        goBackButton.props.onClick()
        expect(goBackToResults).toHaveBeenCalled()
      })
    })

    describe('when component mounts', () => {
      it('calls the clearSnapshot and createSnapshot Person', () => {
        const clearSnapshot = jasmine.createSpy('clearSnapshot')
        const createSnapshotPerson = jasmine.createSpy('createSnapshotPerson')
        render({params: {id: '1'}, clearSnapshot, createSnapshotPerson}, false)
        expect(clearSnapshot).toHaveBeenCalled()
        expect(createSnapshotPerson).toHaveBeenCalledWith('1')
      })
    })

    describe('when the component unmounts', () => {
      it('calls unmount', () => {
        const unmount = jasmine.createSpy('unmount')
        const page = render({unmount})
        page.unmount()
        expect(unmount).toHaveBeenCalled()
      })
    })
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

    describe('goBackToResults', () => {
      it('dispatches viewSnapshotSearch action', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const props = mapDispatchToProps(dispatch)
        props.goBackToResults()
        expect(dispatch).toHaveBeenCalledWith(viewSnapshotSearch())
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
