import * as actions from 'actions/contactActions'
import ContactValidator from 'investigations/contacts/ContactValidator'
import InvestigationContact from 'investigations/InvestigationContact'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const errors = (contact) => (
  new ContactValidator(contact).validate()
)

const mapStateToProps = (state, ownProps) => {
  const contactFields = state.get('contact')
  const contactValues = contactFields.map((field) => field.get('value')).toJS()

  return {
    investigationId: ownProps.params.investigation_id,
    contact: contactValues,
    errors: errors(contactValues),
    statuses: state.get('contactStatuses').toJS(),
  }
}

const mapDispatchToProps = (dispatch, _ownProps) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(InvestigationContact)
