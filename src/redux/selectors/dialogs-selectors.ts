import { AppStateType } from './../reduces/index'
const selectors = {
  getCurrentDialogId: (state: AppStateType) => state.dialogs.currentDialogId,
  getDialogs: (state: AppStateType) => state.dialogs.items
}

export default selectors
