
import { initAuth } from '/imports/actions/auth';

export default (store) => {
  store.dispatch(initAuth());
};
