import { ActionsTypes } from './../actions/app'

const initialState = {
  isInitialized: false
}

export type InitialStateType = typeof initialState

export default (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'APP:INITIALIZE_APP':
      return {
        ...state,
        isInitialized: true
      }
    default:
      return state
  }
}
