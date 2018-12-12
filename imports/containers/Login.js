import connect from 'react-redux-connect-lifecycle';
import { signup, login } from '/imports/actions/auth';
import Login from '/imports/ui/Login';

const mapStateToProps = state => ({
  location: state.router.location,
});

const mapDispatchToProps = {
  signup,
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
