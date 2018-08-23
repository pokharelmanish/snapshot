import {connect} from 'react-redux'
import CardView from 'views/CardView'
import {setCardMode, EDIT_MODE, SHOW_MODE} from 'actions/screeningPageActions'
import {
  getCardModeValueSelector,
  getCardIsEditableSelector,
} from 'selectors/screening/screeningPageSelectors'

const mapStateToProps = (state, {id}) => ({
  editable: getCardIsEditableSelector(state, id),
  mode: getCardModeValueSelector(state, id),
})

export const mapDispatchToProps = (dispatch, {id}) => ({
  onEdit: () => dispatch(setCardMode(id, EDIT_MODE)),
  onShow: () => dispatch(setCardMode(id, SHOW_MODE)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardView)
