import React from 'react'
import classNames from 'classnames'

import './Status.scss'
import { useSelector } from 'react-redux'
import { dialogsSelectors, usersSelectors } from '../../redux/selectors'
import { DialogType } from '../../types/types'

const Status: React.FC = (props) => {
  const currentDialogId = useSelector(dialogsSelectors.getCurrentDialogId)
  const dialogs = useSelector(dialogsSelectors.getDialogs)
  const userId = useSelector(usersSelectors.getUserId)

  if (dialogs.length < 1 || !currentDialogId) {
    return null
  }
  const currentDialogObj: DialogType = dialogs.filter((item) => {
    return item._id === currentDialogId
  })[0]

  if (currentDialogObj) {
    let partner =
      userId === currentDialogObj.author._id
        ? currentDialogObj.partner
        : currentDialogObj.author
    return (
      <div className="chat__dialog-header-center">
        <b className="chat__dialog-header-username">{partner.fullname}</b>
        <div className="chat__dialog-header-status"></div>
        <div
          className={classNames('status', {
            'status--online': partner.isOnline
          })}
        >
          {partner.isOnline ? 'онлайн' : 'офлайн'}
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Status
