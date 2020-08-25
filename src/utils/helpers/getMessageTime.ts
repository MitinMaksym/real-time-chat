import format from 'date-fns/format'
import isToday from 'date-fns/isToday'

const getMessageTime = (create_at: Date) => {
  if (isToday(new Date(create_at))) {
    return format(new Date(create_at), 'HH:mm')
  } else {
    return format(new Date(create_at), 'dd.MM.yyyy')
  }
}

export default getMessageTime
