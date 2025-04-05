import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleAddUser, handleAddToken } from "../../redux/actions/user";
import User from "./User";

function mapStateToProps(state) {
  const user = state.userDetails?.user || {};
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      handleAddUser,
      handleAddToken,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
