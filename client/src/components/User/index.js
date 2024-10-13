import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleAddUser } from "../../redux/actions/user";
import User from "./User";

function mapStateToProps(state, props) {
  const user = state.user;
  return { user };
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators(
    {
      handleAddUser,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
