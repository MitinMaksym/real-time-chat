import { AppStateType } from './../reduces/index'
const selectors = {
  getUserId: (state: AppStateType) => state.user.data?.id
}

export default selectors
