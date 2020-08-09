import { InferActionsTypes } from './../store'
import { AppStateType } from './../reduces/index'
import { UserDataType, BaseThunkType } from './../../types/types'
import { userApi } from '../../utils/api'
import { openNotification } from '../../utils/helpers'
import axios from 'axios'
import { Dispatch } from 'redux'

export type ActionsTypes = InferActionsTypes<typeof actions>

export type UsersThunkType = BaseThunkType<ActionsTypes>
const actions = {
  setAuth: (payload: boolean) =>
    ({
      type: 'USERS:SET_IS_AUTH',
      payload
    } as const),
  setUserData: (data: UserDataType | null) => {
    return {
      type: 'USERS:SET_USER_DATA',
      payload: data
    } as const
  }
}

//-----------------THUNK CREATORS

export const fetchUserData = () => async (
  dispatch: Dispatch<ActionsTypes>,
  getState: () => AppStateType
) => {
  try {
    const data = await userApi.getUserInfo()

    if (data.status === 'success') {
      dispatch(actions.setUserData(data.user))
      dispatch(actions.setAuth(true))
    }
  } catch (err) {
    if (err.response.status === 403) {
      delete window.localStorage.token
      axios.defaults.headers.common['token'] = ''
      dispatch(actions.setAuth(false))
    } else {
      dispatch(actions.setAuth(false))
      console.log(err)
    }
  }
}

export const fetchLoginData = async (postData: {
  email: string
  password: string
}) => {
  try {
    const data = await userApi.signUserIn(postData)
    if (data.status === 'success') {
      const { token } = data

      window.localStorage['token'] = token
      axios.defaults.headers.common['token'] = token

      openNotification({
        type: 'success',
        message: 'Авторизация пройшла успешно!',
        description: '',
        duration: 1
      })
      return data
    }
  } catch (err) {
    if (err.response.status === 404) {
      openNotification({
        type: 'error',
        message: 'Ошибка при авторизации',
        description: 'Такой пользователь не зарегистрирован',
        duration: 1
      })
    } else if (err.response.status === 401) {
      openNotification({
        type: 'error',
        message: 'Ошибка при авторизации',
        description: 'Ваш аккаунт не подтвержден',
        duration: 1
      })
    } else {
      delete window.localStorage.token
      axios.defaults.headers.common['token'] = ''
      openNotification({
        type: 'error',
        message: 'Ошибка при авторизации',
        description: 'Неправильный логин или пароль',
        duration: 1
      })
    }
  }
}

export const signOut = (): UsersThunkType => async (dispatch) => {
  dispatch(actions.setAuth(false))
  dispatch(actions.setUserData(null))
  delete window.localStorage.token
}

export default actions
