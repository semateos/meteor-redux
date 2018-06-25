import connect from 'react-redux-connect-lifecycle';
import AuthMethods from '/imports/api/auth/methods';
import Login from '/imports/ui/Login';
import { addToast } from '/imports/actions/toasts';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = ({
  signup: (creds) => (dispatch) =>
    dispatch(AuthMethods.signup.action(creds))
      .catch((err) => dispatch(addToast({ err }))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
