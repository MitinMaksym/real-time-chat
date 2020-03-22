export const INITIALIZED_SUCCESS = "APP:INITIALIZED_SUCCESS";
export type InitialStateType = {
  isInitialized: boolean;
};
const initialState: InitialStateType = {
  isInitialized: false
};

export default (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        isInitialized: true
      };
    default:
      return state;
  }
};
