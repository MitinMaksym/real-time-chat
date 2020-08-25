import React from 'react'
import classNames from 'classnames'

import './Status.scss'
import { DialogType } from '../../types/types'

const Status: React.FC<Props> = (props) => {
  let { currentDialogId, currentDialogObj, userId } = props

  if (!currentDialogObj || !currentDialogId) {
    return null
  }

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
}

export default Status

type Props = {
  currentDialogId: string
  currentDialogObj: DialogType
  userId: string
}
