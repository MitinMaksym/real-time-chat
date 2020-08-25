import React, { useState, useEffect } from 'react'

import { Upload, Modal } from 'antd'
import { AttachmentType } from '../../types/types'

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

type Props = {
  attachments: Array<AttachmentType>
  removeAttachment: (file: AttachmentType) => void
}

let UploadFiles: React.FC<Props> = ({ attachments, removeAttachment }) => {
  let [previewVisible, setPreviewVisible] = useState<boolean>(false)
  let [previewImage, setPreviewImage] = useState<string>('')
  let [fileList, setFileList] = useState(attachments)
  let handleCancel = () => {
    setPreviewVisible(false)
  }

  let handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  }

  let handleChange = (data: {
    file: AttachmentType
    fileList: Array<AttachmentType>
  }) => {
    setFileList(data.fileList)
  }
  useEffect(() => {
    setFileList(attachments)
  }, [attachments])
  return (
    <div className="clearfix">
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        //@ts-ignore
        fileList={fileList}
        onPreview={handlePreview}
        onChange={(data: any) => {
          handleChange(data)
        }}
        //@ts-ignore
        onRemove={(file: AttachmentType) => {
          removeAttachment(file)
        }}
      ></Upload>{' '}
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>{' '}
    </div>
  )
}

export default React.memo(UploadFiles)
