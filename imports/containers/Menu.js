import connect from 'react-redux-connect-lifecycle';
import { logout } from '/imports/actions/auth';
import { Menu } from '/imports/ui/Menu';

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
  logout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
