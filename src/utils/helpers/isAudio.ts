import { AttachmentServerType } from "./../../types/types";
export default (attachments: Array<AttachmentServerType> | undefined) => {
  if (!attachments) {
    return null;
  }
  const file = attachments[0];
  return attachments.length && file.ext === "webm";
};
