import React, { useState, useEffect, useCallback } from "react";
import { ChatInput as ChatInputBase } from "../components";
import { connect } from "react-redux";
import messagesActions from "../redux/actions/messages";
import { attachmentsActions } from "../redux/actions";
import socket from "../core/socket";
import { filesApi } from "../utils/api";

const ChatInput = ({
  currentDialogId,

  sendMessage,
  upload,
  setAttachments,
  removeAttachment,
  attachments
}) => {
  const [value, setValue] = useState("");
  const [emojiVisible, setEmojiVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  let [isDisabled, setIsDisabled] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia;

  const onRecord = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, onRecording, onError);
    }
  };

  const onRecording = stream => {
    const recorder = new MediaRecorder(stream);
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
      console.log(e.data);
      //setLoading(true);
      filesApi.file(file).then(data => {
        sendAudio(data.file._id);
      });
    };
  };

  const onError = err => {
    console.log("The following error occured: " + err);
  };

  const sendAudio = audioId => {
    console.log(currentDialogId);
    return sendMessage({
      text: null,
      currentDialogId,
      attachments: [audioId]
    });
  };
  const onSendMessage = () => {
    if (isRecording) {
      mediaRecorder.stop();
    } else if (value || attachments.length) {
      sendMessage({
        text: value,
        currentDialogId,
        attachments: attachments.map(file => file.uid)
      });
      setValue("");
      setAttachments([]);
    }
  };
  const handleSendMessage = e => {
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

  const onOutSideClick = (e, el) => {
    if (el && !el.contains(e.target)) {
      setEmojiVisible(false);
    }
  };
  const toggleEmoji = () => {
    setEmojiVisible(!emojiVisible);
  };
  const addEmoji = emoji => {
    setValue(value + emoji.native);
  };
  //---------------------FILE

  let selectFile = async files => {
    let uploaded = attachments.length ? attachments : [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let uid = Math.random(Math.random() * 1000);
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
      await upload(file).then(file => {
        uploaded = uploaded.map(item => {
          if (item.uid === uid) {
            return {
              uid: file._id,
              name: file.filename,
              status: "done",
              url: file.url.replace(/http/, "https")
            };
          }
          return item;
        });
      });
    }
    setAttachments(uploaded);
    setIsDisabled(false);
  };
  const inputRef = useCallback(
    node => {
      if (node) {
        let margin = 40;
        let elHeight = node.offsetHeight + margin + 93.5;

        if (attachments.length > 0) {
          elHeight = elHeight + 112;
        }
        const el = document.querySelector(".chat__dialog-messages");
        if (el) {
          el.style.height = `calc(100% - ${elHeight}px)`;
          if (value.length === 0 && !attachments.length) {
            el.style.height = `calc(100% - 185px)`;
          }
        }
      }
    },
    [value, attachments]
  );

  useEffect(() => {
    const el = document.querySelector(".chat-input__smile-btn");
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
    currentDialogId && (
      <ChatInputBase
        inputRef={inputRef}
        value={value}
        setValue={setValue}
        toggleEmoji={toggleEmoji}
        emojiVisible={emojiVisible}
        setEmojiVisible={setEmojiVisible}
        addEmoji={addEmoji}
        selectFile={selectFile}
        attachments={attachments}
        removeAttachment={removeAttachment}
        isDisabled={isDisabled}
        handleSendMessage={handleSendMessage}
        onSendMessage={onSendMessage}
        isRecording={isRecording}
        handleStartRecording={handleStartRecording}
        onStopRecording={onStopRecording}
        onRecord={onRecord}
      />
    )
  );
};
export default connect(
  ({ dialogs, attachments, user }) => ({
    currentDialogId: dialogs.currentDialogId,
    attachments: attachments.items
  }),
  { ...messagesActions, ...attachmentsActions }
)(ChatInput);
