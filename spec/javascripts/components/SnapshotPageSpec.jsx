import React from 'react'
import {SnapshotPage, mapDispatchToProps} from 'snapshots/SnapshotPage'
import {clear, resetPersonSearch} from 'actions/peopleSearchActions'
import {viewSnapshotDetail} from 'actions/snapshotActions'
import {shallow} from 'enzyme'
import * as IntakeConfig from 'common/config'

const render = ({participants = [], results = [], ...args}) => {
  const props = {participants, results, ...args}
  return shallow(<SnapshotPage {...props} />, {disableLifecycleMethods: true})
}

describe('SnapshotPage', () => {
  describe('layout', () => {
    beforeEach(() => {
      spyOn(IntakeConfig, 'isFeatureInactive').and.returnValue(true)
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(false)
    })

    it('renders PageHeader with title and start over button', () => {
      const snapshotPage = render({})
      const header = snapshotPage.find('Connect(PageHeader)')
      expect(header.exists()).toBe(true)
      expect(header.props().pageTitle).toEqual('Snapshot')
      expect(header.props().button.type).toEqual('button')
      expect(header.props().button.props.children).toEqual('Start Over')
    })

    it('renders a BreadCrumb with crumb', () => {
      const snapshotPage = render({})
      const breadCrumb = snapshotPage.find('Connect(BreadCrumb)')
      const crumb = breadCrumb.props().navigationElements
      expect(breadCrumb.exists()).toBe(true)
      expect(crumb.length).toBe(1)
      expect(crumb[0]).toBe('Snapshot')
    })

    it('renders person search', () => {
      const snapshotPage = render({})
      expect(snapshotPage.find('Connect(PersonSearchForm)').exists()).toBe(true)
      expect(snapshotPage.find('Connect(PersonSearchForm)').props().isClientOnly).toBe(true)
    })

    it('renders a PersonSearchResults if advanced search feature flag is on', () => {
      spyOn(IntakeConfig, 'isAdvancedSearchOn').and.returnValue(true)
      const results = [{fullName: 'Sarah Timson'}]
      const snapshotPage = render({results: results})
      const personSearchResults = snapshotPage.find('Connect(PersonSearchResults)')
      expect(personSearchResults.exists()).toEqual(true)
    })

    it('does not render a PersonSearchResults if advanced search feature flag is off', () => {
      spyOn(IntakeConfig, 'isAdvancedSearchOn').and.returnValue(false)
      const results = [{fullName: 'Sarah Timson'}]
      const snapshotPage = render({results: results})
      const personSearchResults = snapshotPage.find('Connect(PersonSearchResults)')
      expect(personSearchResults.exists()).toEqual(false)
    })

    it('does not render PersonSearchResults when there are no results', () => {
      const snapshotPage = render({results: []})
      expect(snapshotPage.find('Connect(PersonSearchResults)').exists()).toBeFalsy()
    })
  })

  describe('event handlers', () => {
    describe('start over button', () => {
      it('calls startOver when clicked', () => {
        const startOver = jasmine.createSpy('startOver')
        const snapshotPage = render({startOver})
        const header = snapshotPage.find('Connect(PageHeader)')
        const startOverButton = header.props().button
        startOverButton.props.onClick()
        expect(startOver).toHaveBeenCalled()
      })
    })

    describe('Person Search Form', () => {
      it('calls viewSnapshotDetail when a person is selected', () => {
        const person = {legacyDescriptor: {legacy_id: '1'}}
        const viewSnapshotDetail = jasmine.createSpy('viewSnapshotDetail')
        const snapshotPage = render({viewSnapshotDetail})
        const personSearchForm = snapshotPage.find('Connect(PersonSearchForm)')
        personSearchForm.props().onSelect(person)
        expect(viewSnapshotDetail).toHaveBeenCalledWith('1')
      })
    })
  })

  describe('mapDispatchToProps', () => {
    describe('starting over', () => {
      it('clears search results and criteria', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const props = mapDispatchToProps(dispatch)
        props.startOver()
        expect(dispatch).toHaveBeenCalledWith(clear('results'))
        expect(dispatch).toHaveBeenCalledWith(resetPersonSearch())
      })
    })

    describe('viewSnapshotDetail', () => {
      it('dispatches the viewSnapshotDetail action with id', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const props = mapDispatchToProps(dispatch)
        props.viewSnapshotDetail('1')
        expect(dispatch).toHaveBeenCalledWith(viewSnapshotDetail('1'))
      })
    })
  })
})
