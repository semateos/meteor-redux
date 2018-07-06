import connect from 'react-redux-connect-lifecycle';
import { NavigationBar } from '/imports/ui/NavigationBar';

const mapStateToProps = (state) => ({
  location: state.router.location,
});

const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
