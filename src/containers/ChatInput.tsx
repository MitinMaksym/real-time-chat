import React, { useState, useEffect, useCallback } from "react";
import { ChatInput as ChatInputBase } from "../components";
import { connect } from "react-redux";
import { attachmentsActions } from "../redux/actions";
import socket from "../core/socket";
import { filesApi, messagesApi } from "../utils/api";
import { AttachmentServerType, AttachmentType } from "../types/types";
import { AppStateType } from "../redux/reduces";

type OwnPropsType = {};

type MapStatePropsType = {
  currentDialogId: string;
  attachments: Array<AttachmentType>;
};

type MapDispatchPropsType = {
  setAttachments: (files: Array<AttachmentType>) => void;
  removeAttachment: (file: AttachmentType) => void;
};

type Props = OwnPropsType & MapDispatchPropsType & MapStatePropsType;

const ChatInput: React.FC<Props> = ({
  currentDialogId,
  setAttachments,
  removeAttachment,
  attachments
}) => {
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [emojiVisible, setEmojiVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  let [isDisabled, setIsDisabled] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    //@ts-ignore
    window.navigator.mozGetUserMedia ||
    //@ts-ignore
    window.navigator.msGetUserMedia ||
    //@ts-ignore
    window.navigator.webkitGetUserMedia;

  const onRecord = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, onRecording, onError);
    }
  };

  const onRecording = (stream: MediaStream) => {
    const recorder: MediaRecorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    };

    recorder.onstop = () => {
      setIsRecording(false);
    };

    recorder.ondataavailable = e => {
      const file = new File([e.data], "audio.webm");
      setLoading(true);
      filesApi
        .file(file)
        .then((data: { status: string; file: AttachmentServerType }) => {
          if (data.status === "success" && data.file._id) {
            sendAudio(data.file._id).then(() => {
              setLoading(false);
            });
          }
        });
    };
  };

  const onError = (err: MediaStreamError) => {
    throw new Error(err.toString());
  };

  const sendAudio = (audioId: string): Promise<any> => {
    return messagesApi.sendMessage({
      text: "",
      currentDialogId,
      attachments: [audioId]
    });
  };
  const onSendMessage = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.stop();
    } else if (value || attachments.length) {
      messagesApi.sendMessage({
        text: value,
        currentDialogId,

        attachments: attachments.map(file => (file.uid ? file.uid : ""))
      });
      setValue("");
      setAttachments([]);
    }
  };
  const handleSendMessage = (
    e: React.KeyboardEvent<HTMLTextAreaElement> &
      React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    socket.emit("DIALOGS:TYPING", { dialogId: currentDialogId });
    if (value.length || attachments.length) {
      if (e.keyCode === 13) {
        onSendMessage(e);
      }
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };
  const onStopRecording = () => {
    setIsRecording(false);
  };
  //----------------------EMOJI

  const onOutSideClick = (e: any, el: HTMLDivElement | null) => {
    if (el && !el.contains(e.target)) {
      setEmojiVisible(false);
    }
  };
  const toggleEmoji = () => {
    setEmojiVisible(!emojiVisible);
  };
  const addEmoji = (emoji: any) => {
    setValue(value + emoji.native);
  };
  //---------------------FILE

  let selectFile = async (files: FileList): Promise<void> => {
    let uploaded: Array<AttachmentType &
      AttachmentServerType> = attachments.length ? attachments : [];
    for (let i = 0; i < files.length; i++) {
      let file: File = files[i];
      let uid: string = Math.floor(Math.random() * 1000).toString();
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
          status: "done",
          url:
            "https://cdn.lowgif.com/small/dc86e54ceca03be4-loading-spinner-animated-gif-83320-mediabin.gif"
        }
      ];
      setAttachments(uploaded);
      setIsDisabled(true);
      // eslint-disable-next-line no-loop-func
      await attachmentsActions
        .upload(file)
        .then((data: { file: AttachmentServerType; status: string }) => {
          if (data.status === "success") {
            uploaded = uploaded.map((item: AttachmentType) => {
              if (item.uid === uid && data.file.url) {
                return {
                  uid: data.file._id,
                  name: data.file.filename,
                  status: "done",
                  url: data.file.url.replace(/http/, "https")
                };
              }
              return item;
            });
          }
        });
    }
    setAttachments(uploaded);
    setIsDisabled(false);
  };
  const inputRef = useCallback(
    (node: HTMLInputElement) => {
      if (node) {
        let margin = 40;
        let elHeight = node.offsetHeight + margin + 93.5;

        if (attachments.length > 0) {
          elHeight = elHeight + 112;
        }
        const el: HTMLDivElement | null = document.querySelector(
          ".chat__dialog-messages"
        );
        if (el) {
          el.style.height = `calc(100% - ${elHeight}px)`;
          if (value.length === 0 && !attachments.length) {
            el.style.height = `calc(100% - 185.5px)`;
          }
        }
      }
    },
    [value, attachments]
  );

  useEffect(() => {
    const el: HTMLDivElement | null = document.querySelector(
      ".chat-input__smile-btn"
    );
    document.addEventListener("click", e => onOutSideClick(e, el));
    return () => {
      document.removeEventListener("click", e => {
        onOutSideClick(e, el);
      });
    };
  }, [currentDialogId]);
  if (!currentDialogId) {
    return null;
  }
  return (
    <ChatInputBase
      inputRef={inputRef}
      value={value}
      setValue={setValue}
      toggleEmoji={toggleEmoji}
      emojiVisible={emojiVisible}
      addEmoji={addEmoji}
      selectFile={selectFile}
      attachments={attachments}
      removeAttachment={removeAttachment}
      isDisabled={isDisabled}
      handleSendMessage={handleSendMessage}
      onSendMessage={onSendMessage}
      isRecording={isRecording}
      onStopRecording={onStopRecording}
      onRecord={onRecord}
      isLoading={isLoading}
    />
  );
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    currentDialogId: state.dialogs.currentDialogId,
    attachments: state.attachments.items
  };
};

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, {
  setAttachments: attachmentsActions.setAttachments,
  removeAttachment: attachmentsActions.removeAttachment
})(ChatInput);
