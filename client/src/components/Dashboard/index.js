import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleDeleteUser, handleDeleteToken } from "../../redux/actions/user";
import Dashboard from "./Dashboard";

function mapStateToProps(state) {
  const user = state.userDetails?.user || {};
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      handleDeleteUser,
      handleDeleteToken,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
