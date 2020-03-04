import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import convertCurrentTime from "../../utils/helpers/convertCurentTime";
import isAudio from "../../utils/helpers/isAudio";

import { Popover, Button } from "antd";

import { Time, IconReaded } from "./../../components";
import playSvg from "../../assets/img/play.svg";
import waveSvg from "../../assets/img/wave.svg";
import pauseSvg from "../../assets/img/pause.svg";
import Avatar from "../Avatar";

import "./Message.scss";
const Render = require("react-emoji-render");
const Emoji = Render.Emojione;

const MessageAudio = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioEl = useRef(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  };

  useEffect(() => {
    setTimeout(() => console.log(audioEl.current.duration), 2000);

    audioEl.current.addEventListener("playing", () => setIsPlaying(true));
    audioEl.current.addEventListener("ended", () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    });
    audioEl.current.addEventListener("pause", () => setIsPlaying(false));
    audioEl.current.addEventListener("timeupdate", () => {
      const duration = (audioEl.current && audioEl.current.duration) || 0;

      setCurrentTime(audioEl.current.currentTime);
      setProgress((audioEl.current.currentTime / duration) * 100);
    });
  }, []);
  return (
    <div className="message__audio">
      <audio src={audioSrc} ref={audioEl} preload="auto"></audio>
      <div
        style={{ width: progress + "%" }}
        className="message__audio-progress"
      ></div>
      <div className="message__audio-info">
        <div className="message__audio-btn">
          <button onClick={toggleAudio}>
            {isPlaying ? (
              <img src={pauseSvg} alt="Pause swg" />
            ) : (
              <img src={playSvg} alt="Play swg" />
            )}
          </button>
        </div>
        <div className="message__audio-wave">
          <img src={waveSvg} alt="Wave svg" />
        </div>
        <div className="message__audio-duration">
          {convertCurrentTime(currentTime)}
        </div>
      </div>
    </div>
  );
};
const Message = ({
  createdAt,
  text,
  user,
  date,
  isMe,
  attachments,
  isTyping,
  audio,
  readed,
  onRemoveMessage,
  setImageUrl
}) => {
  const renderAttachment = item => {
    if (item.ext !== "webm") {
      return (
        <div key={item._id} className="message__attachments-item">
          <img
            src={item.url.replace(/http/, "https")}
            alt={item.filename}
            onClick={() => {
              onShowImage(item.url);
            }}
          />
        </div>
      );
    } else {
      return <MessageAudio key={item._id} audioSrc={item.url} />;
    }
  };

  let onShowImage = url => {
    setImageUrl(url);
  };
  return (
    <div
      className={classNames("message", {
        "message--isme": isMe,
        "message--is-typing": isTyping,
        "message--image": attachments && attachments.length === 1 && !text,
        "message--is-audio": isAudio(attachments)
      })}
    >
      <div className="message__content">
        <IconReaded isMe={isMe} isReaded={readed} />
        <div className="message__icon-actions">
          <Popover
            content={
              <div>
                <Button onClick={onRemoveMessage} type="danger">
                  Удалить сообщение
                </Button>
              </div>
            }
            trigger="click"
          >
            <Button type="link" shape="circle" icon="ellipsis" />
          </Popover>
        </div>
        <div className="message__avatar">
          <Avatar user={user} />
        </div>
        <div className="message__info">
          {" "}
          {(isTyping || text) && (
            <div className="message__bubble">
              {text && <p className="message__text">{<Emoji text={text} />}</p>}

              {isTyping && (
                <div className="message__typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              {audio && <MessageAudio audioSrc={audio} />}
            </div>
          )}
          {attachments && (
            <div className="message__attachments">
              {attachments.map(item => renderAttachment(item))}
            </div>
          )}
          {date && (
            <span className="message__date">
              <Time date={new Date(createdAt)} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

Message.defaultProps = {
  user: {}
};

Message.propTypes = {
  avatar: PropTypes.string,
  text: PropTypes.string,
  user: PropTypes.object,
  data: PropTypes.instanceOf(Date),
  attachments: PropTypes.array,
  isTyping: PropTypes.bool,
  isReaded: PropTypes.bool,
  isMe: PropTypes.bool
};

export default Message;
