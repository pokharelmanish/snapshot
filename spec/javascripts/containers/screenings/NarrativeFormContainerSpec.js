import {mapDispatchToProps} from 'containers/screenings/NarrativeFormContainer'

describe('NarrativeFormContainer', () => {
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      window.location.hash = ''
    })
    afterEach(() => {
      window.location.hash = ''
    })
    describe('when saving', () => {
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onSave} = mapDispatchToProps(dispatch)
        onSave()
        expect(window.location.hash).toEqual('#narrative-card-anchor')
      })
    })
    describe('when canceling', () => {
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onCancel} = mapDispatchToProps(dispatch)
        onCancel()
        expect(window.location.hash).toEqual('#narrative-card-anchor')
      })
    })
  })
})
