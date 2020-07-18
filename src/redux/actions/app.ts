import { BaseThunkType } from './../../types/types'
import { fetchUserData } from './user'
import { InferActionsTypes } from '../store'

export type ActionsTypes = InferActionsTypes<typeof actions>
type AppThunkType = BaseThunkType<ActionsTypes>

const actions = {
  initializeAppAC: () => ({ type: 'APP:INITIALIZE_APP' } as const)
}

//------------------------THUNK CREATORS
export const initializeApp = (): AppThunkType => async (dispatch, getState) => {
  let isAuth = getState().user.isAuth
  if (isAuth) {
    let promise = dispatch(fetchUserData())
    await Promise.all([promise])
    dispatch(actions.initializeAppAC())
  } else {
    dispatch(actions.initializeAppAC())
  }
}
export default actions
