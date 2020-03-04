import React from "react";
import createAvatarFromHash from "../../utils/helpers/createAvatarFromHash";

import "./Avatar.scss";

export default function Avatar({ user }) {
  if (user) {
    if (user.avatar) {
      return (
        <img
          src={user.avatar}
          className="avatar"
          alt={`Avatar ${user.fullname}`}
        />
      );
    } else {
      const { color, colorLighten } = createAvatarFromHash(user._id);
      const firstChar = user.fullname[0].toUpperCase();
      return (
        <div
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`
          }}
          className="avatar avatar--symbol"
        >
          {firstChar}
        </div>
      );
    }
  }
}
