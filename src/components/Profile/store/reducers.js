import { TYPES } from "./actionTypes";
import { SET_PROGRESS_SUCCESS } from "../../../store/actions/actions";

const initialState = {
  user: {
    created: false,
    isLoading: false,
    error: null,
    authorized: false,
    items: {}
  },
  investor: {
    created: false,
    isLoading: false,
    error: null,
    authorized: false,
    dashboard: {},
    items: {}
  },
  recipient: {
    created: false,
    isLoading: false,
    error: null,
    authorized: false,
    dashboard: {},
    items: {}
  },
  developer: {
    created: false,
    isLoading: false,
    error: null,
    authorized: false,
    dashboard: {},
    items: {}
  },
  entity: {
    created: false,
    isLoading: false,
    error: null,
    authorized: false,
    items: {
      Developer: false,
      Contractor: false,
      Originator: false,
      Guarantor: false
    }
  },
  roles: {}
};

const userAccountReducer = (state = initialState, action) => {
  if (action.entity === "undefined") return state;
  switch (action.type) {
    case action.entity && TYPES[action.entity].REGISTER_SUCCESS:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          created: true,
          authorized: false
        }
      };
    case action.entity && TYPES[action.entity].REGISTER_FAILURE:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          isLoading: false,
          error: action.payload,
          authorized: false
        }
      };
    case action.entity && TYPES[action.entity].VALIDATE:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          isLoading: true
        }
      };
    case action.entity && TYPES[action.entity].VALIDATE_SUCCESS:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          items: action.payload,
          isLoading: false,
          error: null,
          authorized: true
        }
      };
    case action.entity && TYPES[action.entity].VALIDATE_FAILURE:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          isLoading: false,
          error: action.payload,
          authorized: false
        }
      };
    case action.entity && TYPES[action.entity].GET_DASHBOARD:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          isLoading: true
        }
      };
    case action.entity && TYPES[action.entity].GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          isLoading: false,
          dashboard: action.payload,
          authorized: true
        }
      };
    case action.entity && TYPES[action.entity].GET_DASHBOARD_FAILURE:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          isLoading: false,
          error: action.payload,
          authorized: false
        }
      };
    case TYPES.UPDATE:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          isLoading: true
        }
      };
    case action.entity && TYPES[action.entity].UPDATE_SUCCESS:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          isLoading: false
        }
      };
    case action.entity && TYPES[action.entity].UPDATE_FAILURE:
      return {
        ...state,
        [action.entity]: {
          ...state[action.entity],
          error: action.payload,
          isLoading: false
        }
      };

    case TYPES.GET_USER_ROLES:
      return {
        ...state,
        roles: {
          ...state.roles,
          isLoading: true
        }
      };
    case TYPES.GET_USER_ROLES_SUCCESS:
      return {
        ...state,
        roles: {
          ...action.data,
          isLoading: false
        }
      };
    case TYPES.GET_USER_ROLES_FAILURE:
      return {
        ...state,
        roles: {
          ...state[action.entity],
          error: action.message,
          isLoading: false
        }
      };
    case TYPES.LOGOUT:
      return {
        user: {
          items: {},
          isLoading: false,
          error: null,
          authorized: false,
          created: false
        },
        investor: {
          created: false,
          isLoading: false,
          error: null,
          authorized: false,
          dashboard: {},
          items: {}
        },
        recipient: {
          created: false,
          isLoading: false,
          error: null,
          authorized: false,
          dashboard: {},
          items: {}
        },
        developer: {
          created: false,
          isLoading: false,
          error: null,
          authorized: false,
          dashboard: {},
          items: {}
        },
        roles: {},
        entity: {
          created: false,
          isLoading: false,
          error: null,
          authorized: false,
          items: {
            Developer: false,
            Contractor: false,
            Originator: false,
            Guarantor: false
          }
        }
      };
    case SET_PROGRESS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          items: {
            ...state.user.items,
            ProfileProgress: action.data
          }
        }
      };
    default:
      return state;
  }
};

export default userAccountReducer;
