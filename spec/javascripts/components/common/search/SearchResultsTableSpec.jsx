import React from 'react'
import SearchResultsTable from 'common/search/SearchResultsTable'
import {mount} from 'enzyme'
import ReactTooltip from 'react-tooltip'

const generateMockResults = (numberOfResults) => {
  const results = []
  for (let x = 0; x < numberOfResults; x++) {
    const result = {'legacyDescriptor': {legacy_id: `${x}`}}
    results.push(result)
  }
  return results
}

const defaultMockedResults = [
  {
    'gender': 'female',
    'caseStatus': 'Closed',
    'spCounty': 'pokhara',
    'spPhone': '111-111-1111',
    'isSealed': true,
    'akaFullName': ' (AKA: Laure)',
    'legacyDescriptor': {
      'legacy_id': '6j6DKYI0Ki',
    },
    'address': {
      'city': 'Lake Elsinore',
      'state': 'CA',
      'zip': '92530',
      'streetAddress': '4451 Anniversary Parkway',
      'type': 'Home',
    },
    'phoneNumber': {
      'number': '(923) 000-9928',
      'type': 'Home',
    },
    'dateOfBirth': '2005-01-03',
    'fullName': 'Sarah Timson',
  },
  {
    'gender': 'female',
    'spCounty': 'pokhara',
    'spPhone': '111-111-1111',
    'isSensitive': true,
    'isApproximateAge': 'Y',
    'clientCounties': [
      'Los Angeles',
    ],
    'address': null,
    'phoneNumber': null,
    'dateOfBirth': '1994-10-01',
    'fullName': 'c2 Bimson',
  },
  {
    'gender': 'unknown',
    'spCounty': 'pokhara',
    'spPhone': '111-111-1111',
    'address': {
      'city': 'King City',
      'state': 'CA',
      'zip': '95662',
      'streetAddress': '456 Anhalt Terrace',
      'type': 'Home',
    },
    'phoneNumber': {
      'number': '(923) 000-9928',
      'type': 'Home',
    },
    'dateOfBirth': '1999-02-17',
    'fullName': 'Sally Mae Dibson',
  },
  {
    'gender': 'male',
    'spCounty': 'pokhara',
    'spPhone': '111-111-1111',
    'address': null,
    'phoneNumber': null,
    'dateOfBirth': '1994-05-14',
    'fullName': 'Simon Donativo',
  },
  {
    'gender': 'male',
    'spCounty': 'pokhara',
    'spPhone': '111-111-1111',
    'address': {
      'city': 'town',
      'state': 'CA',
      'zip': null,
      'streetAddress': '123 4th',
      'type': 'Placement Home',
    },
    'phoneNumber': null,
    'dateOfBirth': '1983-01-01',
    'fullName': 'First Gimson',
  },
  {
    'gender': 'male',
    'spCounty': 'pokhara',
    'spPhone': '111-111-1111',
    'address': {
      'city': 'town',
      'state': 'CA',
      'zip': null,
      'streetAddress': '123 4th',
      'type': 'Placement Home',
    },
    'phoneNumber': null,
    'dateOfBirth': '1983-01-01',
    'fullName': 'Second Gimson',
  },
]

const render = (
  {
    results = [],
    resultsSubset = [],
    setCurrentPageNumber = () => {},
    setCurrentRowNumber = () => {},
    onLoadMoreResults = () => {},
    personSearchFields = {},
    currentRow = 25,
    total = 0,
    onAuthorize = () => {},
  } = {}) => {
  return mount(
    <SearchResultsTable
      results={results}
      resultsSubset={resultsSubset}
      setCurrentPageNumber={setCurrentPageNumber}
      setCurrentRowNumber={setCurrentRowNumber}
      onLoadMoreResults={onLoadMoreResults}
      personSearchFields={personSearchFields}
      currentRow={currentRow}
      total={total}
      onAuthorize={onAuthorize}
    />, {disableLifecycleMethods: true})
}

describe('SearchResultsTable', () => {
  let component
  beforeEach(() => {
    component = render({resultsSubset: defaultMockedResults})
  })

  describe('layout', () => {
    it('renders a AlertMessageResultsLimit component and sets total', () => {
      const totalResults = 251
      const component = render({total: totalResults})
      const alertMessage = component.find('AlertMessageResultsLimit')
      expect(alertMessage.exists()).toBe(true)
      expect(alertMessage.props().total).toBe(totalResults)
    })

    describe('ReactTable', () => {
      it('renders a table', () => {
        const table = component.find('ReactTable')
        expect(table.exists()).toBe(true)
        expect(table.props().sortable).toBe(false)
      })

      describe('page count', () => {
        describe('when the total number of results is 250 or less', () => {
          describe('when the total is 198', () => {
            describe('and the number of rows per page is 5', () => {
              it('sets the page count to 40', () => {
                const totalResults = 198
                const numOfResultsPerPage = 5
                const expectedPageCount = 40
                const component = render({total: totalResults, currentRow: numOfResultsPerPage})
                const table = component.find('ReactTable')
                const pages = table.props().pages
                expect(pages).toBe(expectedPageCount)
              })
            })
          })

          describe('when the total is 140', () => {
            describe('and the number of rows per page is 100', () => {
              it('sets the page count to 2', () => {
                const totalResults = 140
                const numOfResultsPerPage = 100
                const expectedPageCount = 2
                const component = render({total: totalResults, currentRow: numOfResultsPerPage})
                const table = component.find('ReactTable')
                const pages = table.props().pages
                expect(pages).toBe(expectedPageCount)
              })
            })
          })
        })

        describe('when the total number of results is 251 or more', () => {
          describe('when the total is 801', () => {
            describe('and the number of rows per page is 20', () => {
              it('sets the page count to 13', () => {
                const totalResults = 801
                const numOfResultsPerPage = 20
                const expectedPageCount = 13
                const component = render({total: totalResults, currentRow: numOfResultsPerPage})
                const table = component.find('ReactTable')
                const pages = table.props().pages
                expect(pages).toBe(expectedPageCount)
              })
            })
          })

          describe('when the total is 684', () => {
            describe('and the number of rows per page is 50', () => {
              it('sets the page count to 5', () => {
                const totalResults = 684
                const numOfResultsPerPage = 50
                const expectedPageCount = 5
                const component = render({total: totalResults, currentRow: numOfResultsPerPage})
                const table = component.find('ReactTable')
                const pages = table.props().pages
                expect(pages).toBe(expectedPageCount)
              })
            })
          })
        })
      })
    })

    it('renders the table headers', () => {
      const header = component.find('div.rt-resizable-header-content')
      expect(header.at(0).text()).toEqual('')
      expect(header.at(1).text()).toEqual('Name')
      expect(header.at(2).find('span').at(0).text()).toEqual('Date of Birth ')
      expect(header.at(3).text()).toEqual('Sex at Birth')
      expect(header.at(4).text()).toEqual('Service Provider County')
      expect(header.at(5).text()).toEqual('Service Provider Phone')
      expect(header.at(6).text()).toEqual('Address')
      expect(header.at(7).text()).toEqual('Case Status')
    })

    it('renders the correct number of rows', () => {
      const rows = component.find('div.rt-tr-group')
      expect(rows.length).toEqual(defaultMockedResults.length)
    })

    it('renders the table data', () => {
      const row = component.find('div.rt-tr-group').at(0)
      const cell = row.find('div.rt-td')
      expect(cell.at(0).text()).toEqual('1.')
      expect(cell.at(1).find('button').text()).toEqual('Sarah Timson')
      expect(cell.at(1).find('span').at(1).text()).toEqual(' (AKA: Laure)')
      expect(cell.at(2).text()).toEqual('01/03/2005')
      expect(cell.at(3).text()).toEqual('Female')
      expect(cell.at(4).text()).toEqual('pokhara')
      expect(cell.at(5).text()).toEqual('(111) 111-1111')
      expect(cell.at(6).text()).toEqual('4451 Anniversary Parkway, Lake Elsinore, CA 92530')
      expect(cell.at(7).text()).toEqual('Closed')
    })

    it('renders Approximate Dob', () => {
      const row = component.find('div.rt-tr-group').at(1)
      const cell = row.find('div.rt-td')
      expect(cell.at(2).text()).toEqual('~10/01/1994')
    })
  })

  describe('onPageChange', () => {
    describe('setCurrentPageNumber', () => {
      describe('when the page is changed', () => {
        it('setCurrentPageNumber is called with the current page number', () => {
          const setCurrentPageNumber = jasmine.createSpy('setCurrentPageNumber')
          const component = render({setCurrentPageNumber})
          const searchResultsTable = component.find('ReactTable')
          searchResultsTable.props().onPageChange(1)
          expect(setCurrentPageNumber).toHaveBeenCalledWith(2)
        })
      })
    })

    describe('onLoadMoreResults', () => {
      describe('when the next page is requested', () => {
        describe('and we have not requested the results for the next page', () => {
          it('onLoadMoreResults is called with personSearchFields and totalResultsReceived', () => {
            const nextPageNumber = 2
            const pageSize = 25
            const onLoadMoreResults = jasmine.createSpy('onLoadMoreResults')
            const personSearchFields = {lastName: 'laure'}
            const results = generateMockResults(25)
            const totalResultsReceived = results.length
            const totalResultsRequested = nextPageNumber * pageSize
            const component = render({
              currentRow: pageSize,
              results,
              onLoadMoreResults,
              personSearchFields,
            })
            const searchResultsTable = component.find('ReactTable')
            searchResultsTable.props().onPageChange(1)
            expect(onLoadMoreResults).toHaveBeenCalledWith(personSearchFields, totalResultsReceived, totalResultsRequested)
          })
        })

        describe('and we have requested the results for the next page', () => {
          it('onLoadMoreResults is not called', () => {
            const onLoadMoreResults = jasmine.createSpy('onLoadMoreResults')
            const results = generateMockResults(50)
            const component = render({
              results,
              onLoadMoreResults,
            })
            const searchResultsTable = component.find('ReactTable')
            searchResultsTable.props().onPageChange(1)
            expect(onLoadMoreResults).not.toHaveBeenCalled()
          })
        })
      })

      describe('when the previous page is requested', () => {
        it('onLoadMoreResults is not called', () => {
          const onLoadMoreResults = jasmine.createSpy('onLoadMoreResults')
          const component = render({onLoadMoreResults})
          const searchResultsTable = component.find('ReactTable')
          searchResultsTable.props().onPageChange(-1)
          expect(onLoadMoreResults).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('onPageSizeChange', () => {
    it('calls setCurrentRowNumber with current page size', () => {
      const setCurrentRowNumber = jasmine.createSpy('setCurrentRowNumber')
      const component = render({resultsSubset: defaultMockedResults, setCurrentRowNumber})
      const searchResultsTable = component.find('ReactTable')
      searchResultsTable.props().onPageSizeChange(5, 1)
      expect(setCurrentRowNumber).toHaveBeenCalledWith(5)
    })

    it('calls setCurrentPageNumber with current page', () => {
      const setCurrentPageNumber = jasmine.createSpy('setCurrentPageNumber')
      const component = render({resultsSubset: defaultMockedResults, setCurrentPageNumber})
      const searchResultsTable = component.find('ReactTable')
      searchResultsTable.props().onPageSizeChange(5, 1)
      expect(setCurrentPageNumber).toHaveBeenCalledWith(2)
    })

    describe('onLoadMoreResults', () => {
      describe('when the page size is increased', () => {
        describe('and we have do not have all the results to display', () => {
          it('onLoadMoreResults is called', () => {
            const currentPageNumber = 1
            const pageSize = 50
            const onLoadMoreResults = jasmine.createSpy('onLoadMoreResults')
            const personSearchFields = {lastName: 'Bravo'}
            const results = generateMockResults(25)
            const totalResultsReceived = results.length
            const totalResultsRequested = currentPageNumber * pageSize
            const component = render({
              results,
              onLoadMoreResults,
              personSearchFields,
            })
            const searchResultsTable = component.find('ReactTable')
            searchResultsTable.props().onPageSizeChange(pageSize, 0)
            expect(onLoadMoreResults).toHaveBeenCalledWith(personSearchFields, totalResultsReceived, totalResultsRequested)
          })
        })

        describe('and we do have all the results to display', () => {
          it('onLoadMoreResults is not called', () => {
            const onLoadMoreResults = jasmine.createSpy('onLoadMoreResults')
            const results = generateMockResults(50)
            const component = render({
              results,
              onLoadMoreResults,
            })
            const searchResultsTable = component.find('ReactTable')
            searchResultsTable.props().onPageSizeChange(50, 0)
            expect(onLoadMoreResults).not.toHaveBeenCalled()
          })
        })
      })

      describe('when the page size is decreased', () => {
        it('onLoadMoreResults is not called', () => {
          const onLoadMoreResults = jasmine.createSpy('onLoadMoreResults')
          const component = render({onLoadMoreResults})
          const searchResultsTable = component.find('ReactTable')
          searchResultsTable.props().onPageSizeChange(5, 1)
          expect(onLoadMoreResults).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('Sealed', () => {
    it('renders Link', () => {
      const row = component.find('div.rt-tr-group').at(0)
      const cell = row.find('div.rt-td')
      expect(cell.find('button').exists()).toBe(true)
    })

    it('render client with tooltip', () => {
      const row = component.find('div.rt-tr-group').at(0)
      const cell = row.find('div.rt-td')
      expect(cell.find('span').at(0).html()).toContain('Sealed')
      expect(cell.find('span i').exists()).toBe(true)
    })
  })

  describe('Sensitive', () => {
    it('render client with tooltip', () => {
      const row = component.find('div.rt-tr-group').at(1)
      const cell = row.find('div.rt-td')
      expect(cell.find('span').at(0).html()).toContain('Sensitive')
      expect(cell.find('span i').exists()).toBe(true)
    })
  })

  describe('ComponentDidUpdate', () => {
    it('rebuild reacttooltip', () => {
      const rebuild = spyOn(ReactTooltip, 'rebuild')
      const currentRow = 10
      component.setProps({currentRow: currentRow})
      expect(rebuild).toHaveBeenCalled()
    })
  })

  describe('onClick', () => {
    it('calls onAuthorize with id', () => {
      const onAuthorize = jasmine.createSpy('onClick')
      const wrapper = render({resultsSubset: defaultMockedResults, onAuthorize})
      const row = wrapper.find('div.rt-tr-group').at(0)
      const cell = row.find('div.rt-td').at(1)
      cell.find('button').props().onClick()
      expect(onAuthorize).toHaveBeenCalledWith('6j6DKYI0Ki')
    })
  })
})
