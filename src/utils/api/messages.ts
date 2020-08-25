import { MessageType } from './../../types/types'
import { axios } from '../../core'

export default {
  getAllByDialogId: async (id: string) => {
    let response = await axios.get<Array<MessageType>>('messages?dialog=' + id)
    return response.data
  },
  sendMessage: async (message: {
    text: string
    currentDialogId: string
    attachments: Array<string>
  }) => {
    axios.post('messages', {
      text: message.text,
      attachments: message.attachments,
      dialog_id: message.currentDialogId
    })
  },
  removeMessageById: async (id: string) => {
    await axios.delete('messages?id=' + id)
  }
}
