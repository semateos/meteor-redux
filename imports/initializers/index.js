import Auth from './auth';

export default {
  run: store => {
    const initializers = [Auth];
    initializers.forEach(init => init(store));
  },
};
