import React, { Fragment } from 'react'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
//@ts-ignore
import { UploadField } from '@navjobs/upload'

import { UploadFiles } from '../'
import { Button, Input, Icon } from 'antd'
import './ChatInput.scss'
import { AttachmentType } from '../../types/types'

type Props = {
  value: string
  setValue: (value: string) => void
  attachments: Array<AttachmentType>
  emojiVisible: boolean
  isDisabled: boolean
  inputRef: (node: HTMLInputElement) => void
  isRecording: boolean
  isLoading: boolean

  toggleEmoji: () => void
  addEmoji: (emoji: any) => void
  selectFile: (files: FileList) => Promise<void>
  removeAttachment: (file: AttachmentType) => void
  handleSendMessage: (
    e: React.KeyboardEvent<HTMLTextAreaElement> &
      React.MouseEvent<HTMLElement, MouseEvent>
  ) => void
  onSendMessage: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onStopRecording: () => void
  onRecord: () => void
}
const ChatInput: React.FC<Props> = (props) => {
  const {
    value,
    setValue,
    toggleEmoji,
    emojiVisible,
    addEmoji,
    selectFile,
    attachments,
    removeAttachment,
    isDisabled,
    inputRef,
    handleSendMessage,
    onSendMessage,
    isRecording,
    onStopRecording,
    onRecord,
    isLoading
  } = props
  return (
    <Fragment>
      <div ref={inputRef} className="chat-input">
        <div>
          <div className="chat-input__smile-btn">
            <div className="chat-input__emoji-picker">
              {emojiVisible && <Picker onSelect={addEmoji} />}
            </div>

            <Button
              onClick={toggleEmoji}
              type="link"
              shape="circle"
              icon="smile"
            />
          </div>
          {isRecording ? (
            <div className="chat-input__record-status">
              <i className="chat-input__record-status-bubble"></i>
              Recording...
              <Button
                className="stop-recording"
                type="link"
                shape="circle"
                icon="close"
                onClick={onStopRecording}
              />
            </div>
          ) : (
            <Input.TextArea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                let re = /^\s/
                let check = re.test(e.target.value)
                if (!check) {
                  setValue(e.target.value)
                }
              }}
              placeholder="Введите текст сообщения"
              autoSize={{ minRows: 2, maxRows: 8 }}
              allowClear={true}
              value={value}
              onKeyUp={handleSendMessage}
              disabled={isDisabled}
            />
          )}

          <div className="chat-input__actions">
            {value || attachments.length || isRecording ? (
              <Button
                disabled={isDisabled}
                onClick={onSendMessage}
                size="large"
                type="link"
                icon="right-circle"
              />
            ) : (
              <div className="chat-input__record-btn">
                {isLoading ? (
                  <Icon type="loading" />
                ) : (
                  <Button
                    onClick={onRecord}
                    type="link"
                    shape="circle"
                    icon="audio"
                    size="large"
                  />
                )}
              </div>
            )}

            <UploadField
              onFiles={selectFile}
              containerProps={{
                className: 'chat-input__actions-upload-btn'
              }}
              uploadProps={{
                accept: '.jpg,.jpeg,.png,.gif,.bmp',
                multiple: 'multiple'
              }}
            >
              <Button type="link" shape="circle" icon="camera" />
            </UploadField>
          </div>
        </div>
      </div>
      <div>
        <UploadFiles
          attachments={attachments}
          removeAttachment={removeAttachment}
        />
      </div>
    </Fragment>
  )
}

export default ChatInput
