
const initState = () => ({
  currentUser: null,
  status: ({
    signup: 'init',
    login: 'init',
    logout: 'init',
  }),
  error: ({
    signup: null,
    login: null,
    logout: null,
  }),
});

const getStatus = (state, key, val) => ({
  ...state.status,
  ...{ [key]: val },
});

const getError = (state, key, val) => ({
  ...state.error,
  ...{ [key]: val },
});

export default function auth(state = initState(), action = {}) {
  switch (action.type) {
    case 'AUTH_INIT':
      return {
        ...state,
        ...{ currentUser: action.payload || null },
      };
    case 'AUTH_SET_INIT_VAL':
      return {
        ...state,
        ...{ status: getStatus(state, action.payload, 'init') },
      };
    case 'AUTH_SIGNUP_PENDING':
      if (action.payload === false) {
        return state;
      }
      return {
        ...state,
        ...{
          status: getStatus(state, 'signup', 'pending'),
          error: getError(state, 'signup', null),
        },
      };
    case 'AUTH_SIGNUP_SUCCESS':
      return {
        ...state,
        ...{
          currentUser: action.payload,
          status: getStatus(state, 'signup', 'success'),
          error: getError(state, 'signup', null),
        },
      };
    case 'AUTH_SIGNUP_FAIL':
      return {
        ...state,
        ...{
          status: getStatus(state, 'signup', 'fail'),
          error: getError(state, 'signup', action.payload),
        },
      };
    case 'AUTH_LOGIN_PENDING':
      if (action.payload === false) {
        return state;
      }
      return {
        ...state,
        ...{
          status: getStatus(state, 'login', 'pending'),
          error: getError(state, 'login', null),
        },
      };
    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        ...{
          currentUser: action.payload,
          status: getStatus(state, 'login', 'success'),
          error: getError(state, 'login', null),
        },
      };
    case 'AUTH_LOGIN_FAIL':
      return {
        ...state,
        ...{
          currentUser: null,
          status: getStatus(state, 'login', 'fail'),
          error: getError(state, 'login', action.payload),
        },
      };
    case 'AUTH_LOGOUT_PENDING':
      if (action.payload === false) {
        return state;
      }
      return {
        ...state,
        ...{
          status: getStatus(state, 'logout', 'pending'),
          error: getError(state, 'logout', null),
        },
      };
    case 'AUTH_LOGOUT_SUCCESS':
      return {
        ...state,
        ...{
          currentUser: null,
          status: getStatus(state, 'logout', 'success'),
          error: getError(state, 'logout', null),
        },
      };
    case 'AUTH_LOGOUT_FAIL':
      return {
        ...state,
        ...{
          status: getStatus(state, 'logout', 'fail'),
          error: getError(state, 'logout', action.payload),
        },
      };
    default:
      return state;
  }
}
