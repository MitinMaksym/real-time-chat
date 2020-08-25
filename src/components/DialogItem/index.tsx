import React from 'react'
import { IconReaded } from '..'
import Avatar from '../Avatar'
import { MessageType, UserDataType } from '../../types/types'
import { getMessageTime } from '../../utils/helpers'

import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
const Render = require('react-emoji-render')
const Emoji = Render.Emojione

const renderLastMessage = (message: MessageType, userId: string) => {
  let text = ''
  if (!message.text && message.attachments) {
    text = 'прикрепленный файл'
  } else {
    text = message.text
  }

  return <Emoji text={`${message.user._id === userId ? 'Вы: ' : ''} ${text}`} />
}
type MapDispatchPropsType = {}
type OwnPropsType = {
  key: string
  _id: string
  isMe: boolean
  partner: UserDataType
  author: UserDataType
  lastMessage: MessageType
  currentDialogId: string
  userId: string
}

type Props = MapDispatchPropsType & OwnPropsType
const DialogItem: React.FC<Props> = ({
  _id,
  isMe,
  partner,
  lastMessage,
  author,
  currentDialogId,
  userId
}) => {
  let user: UserDataType = isMe ? partner : author
  return (
    <Link to={`/dialog/${_id}`}>
      <div
        className={classNames('dialogs__item', {
          'dialogs__item--online': user.isOnline,
          'dialogs__item--active': currentDialogId === _id
        })}
      >
        <div className="dialogs__item-avatar">
          <Avatar user={user} />
        </div>
        <div className="dialogs__item-info">
          <div className="dialogs__item-info-top">
            <b>{user.fullname}</b>
            {lastMessage && (
              <span>{getMessageTime(new Date(lastMessage.createdAt))}</span>
            )}
          </div>
          {lastMessage && (
            <div className="dialogs__item-info-bottom">
              <p>{renderLastMessage(lastMessage, userId)}</p>

              <IconReaded
                isMe={userId === lastMessage.user._id}
                isReaded={lastMessage.readed}
              />

              {lastMessage.user._id !== userId && lastMessage.readed === false && (
                <div className="dialogs__item-info-bottom-count">
                  <Icon type="mail" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default React.memo(DialogItem)
