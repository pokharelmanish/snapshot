import React from 'react'
import PropTypes from 'prop-types'
// import ScreeningsTable from 'screenings/ScreeningsTableContainer'
import PageHeader from 'common/PageHeader'
import BreadCrumb from 'containers/common/BreadCrumb'

const HomePageButtons = ({snapshot, createSnapshot}) => (
  <div className='pull-right'>
    {
      snapshot &&
      <button type='button'
        className='btn primary-btn'
        disabled={false}
        onClick={createSnapshot}
      >
      Start Snapshot
      </button>
    }
  </div>
)

HomePageButtons.propTypes = {
  createSnapshot: PropTypes.func,
  snapshot: PropTypes.bool,
}

export const HomePage = ({snapshot, actions: {createSnapshot}}) => (
  <div>
    <div>
      <PageHeader
        pageTitle='Dashboard'
        button={
          <HomePageButtons
            snapshot={snapshot}
            createSnapshot={createSnapshot}
          />
        }
      />
      <BreadCrumb />
    </div>
  </div>
)

HomePage.propTypes = {
  actions: PropTypes.shape({
    createScreening: PropTypes.func,
    createSnapshot: PropTypes.func,
  }),
  hotline: PropTypes.bool,
  snapshot: PropTypes.bool,
}
