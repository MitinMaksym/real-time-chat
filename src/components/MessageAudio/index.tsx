import React, { useState, useRef, useEffect } from "react";

import playSvg from "../../assets/img/play.svg";
import waveSvg from "../../assets/img/wave.svg";
import pauseSvg from "../../assets/img/pause.svg";
import convertCurrentTime from "../../utils/helpers/convertCurentTime";

type Props = {
  audioSrc: string;
};

const MessageAudio: React.FC<Props> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const audioEl = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioEl.current) {
      if (!isPlaying) {
        audioEl.current.play();
      } else {
        audioEl.current.pause();
      }
    }
  };

  useEffect(() => {
    if (audioEl.current) {
      audioEl.current.addEventListener("playing", () => setIsPlaying(true));
      audioEl.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      });
      audioEl.current.addEventListener("pause", () => setIsPlaying(false));
      audioEl.current.addEventListener("timeupdate", () => {
        const duration = (audioEl.current && audioEl.current.duration) || 0;
        if (audioEl.current) {
          setCurrentTime(audioEl.current.currentTime);
          setProgress((audioEl.current.currentTime / duration) * 100);
        }
      });
    }
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

export default MessageAudio;
