export const INITIALIZED_SUCCESS = "APP:INITIALIZED_SUCCESS";

const initialState = {
  isInitialized: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        isInitialized: true
      };
    default:
      return state;
  }
};
