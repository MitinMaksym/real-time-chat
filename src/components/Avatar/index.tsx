import { UserDataType } from './../../types/types'
import React from 'react'
import createAvatarFromHash from '../../utils/helpers/createAvatarFromHash'

import './Avatar.scss'
type Props = {
  user: UserDataType
}

let Avatar: React.FC<Props> = ({ user }) => {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        className="avatar"
        alt={`Avatar ${user.fullname}`}
      />
    )
  } else {
    const { color, colorLighten } = createAvatarFromHash(user._id)
    const firstChar: string = user.fullname[0].toUpperCase()
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`
        }}
        className="avatar avatar--symbol"
      >
        {firstChar}
      </div>
    )
  }
}

export default React.memo(Avatar)
