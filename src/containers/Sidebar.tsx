import React, { useState } from 'react'

import { Sidebar as SidebarBase } from '../components'
import { userApi, dialogsApi } from '../utils/api'
import { UserDataType } from '../types/types'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { openNotification } from '../utils/helpers'

type Props = RouteComponentProps

let Sidebar: React.FC<Props> = (props) => {
  let [visible, setVisible] = useState(false)
  let [isLoading, setIsLoading] = useState(false)
  let [users, setUsers] = useState<Array<UserDataType>>([])
  let [newMessageText, setNewMessageText] = useState<string>('')
  let [partner, setPartner] = useState<string>('')
  let [selectedInputValue, setSelectInputValue] = useState('')
  let showModal = () => {
    setVisible(true)
  }

  let handleOk = async () => {
    setIsLoading(true)
    setNewMessageText('')
    setSelectInputValue('')
    setUsers([])
    setPartner('')
    setIsLoading(false)
    setVisible(false)
    setIsLoading(false)
    setVisible(false)
    try {
      let data = await dialogsApi.createDialog({
        partner: partner,
        text: newMessageText
      })
      if (data && data.status === 'success') {
        props.history.push(`/dialog/${data.dialog._id}`)
      }
    } catch (err) {
      if (err.response.status === 403) {
        openNotification({
          type: 'error',
          message: 'Такой диалог уже существует',
          description: '',
          duration: 1
        })
      } else {
        openNotification({
          type: 'error',
          message: 'Ошибка',
          description: '',
          duration: 1
        })
      }
    }
  }

  let handleCancel = () => {
    setVisible(false)
    setSelectInputValue('')
    setPartner('')
    setUsers([])
  }

  //------------------SELECT HANDLERS
  function onInputSelect(value: string) {
    setPartner(value)
  }
  function onInputChange(value: string) {
    setSelectInputValue(value)
  }

  let onSearch = async (val: string) => {
    try {
      let data = await userApi.findUsers(val)
      if (data.status === 'success') {
        setUsers(data.users)
      }
    } catch (err) {
      console.error(err)
    }
  }

  //-------------------NEW MESSAGE FORM HANDLERS
  let onAddNewMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessageText(e.target.value)
  }
  return (
    <SidebarBase
      modalText=""
      isLoading={isLoading}
      visible={visible}
      showModal={showModal}
      handleCancel={handleCancel}
      handleOk={handleOk}
      onInputSelect={onInputSelect}
      users={users}
      onSearch={onSearch}
      onAddNewMessage={onAddNewMessage}
      partner={partner}
      newMessageText={newMessageText}
      selectedInputValue={selectedInputValue}
      onInputChange={onInputChange}
    />
  )
}

export default withRouter(Sidebar)
