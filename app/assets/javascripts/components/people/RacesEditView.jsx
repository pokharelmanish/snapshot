import CheckboxField from 'components/common/CheckboxField'
import Immutable from 'immutable'
import RACES from 'Races'
import React from 'react'

export class RacesEditView extends React.Component {
  constructor() {
    super(...arguments)
  }

  changeRace(race, isChecked) {
    const {races} = this.props
    if (isChecked) {
      let newRaces
      if (RACES[race].exclusive) {
        newRaces = Immutable.List([race])
      } else {
        newRaces = this.props.races.push(race)
      }
      this.props.onChange(newRaces)
    } else {
      this.props.onChange(races.filterNot((item) => item === race))
    }
  }

  render() {
    const {races} = this.props
    const exclusiveRaceSelected = races.some((race) => RACES[race].exclusive)
    return (
      <div className='gap-top'>
        <fieldset className='fieldset-inputs sans'>
          <label>Race</label>
          <ul className='unstyled-list css-column-count--two'>
            {
              Object.keys(RACES).map((race) => {
                const isSelected = races.includes(race)
                const isDisabled = exclusiveRaceSelected && !isSelected
                return (
                  <CheckboxField
                    key={race}
                    id={race}
                    value={race}
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={(event) => this.changeRace(race, event.target.checked)}
                  />
                  )
              })
            }
          </ul>
        </fieldset>
        <hr />
      </div>
    )
  }
}

RacesEditView.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  races: React.PropTypes.object.isRequired,
}

export default RacesEditView