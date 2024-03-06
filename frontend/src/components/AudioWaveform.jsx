import { useEffect, useRef, useState } from "react";
import wavesurfer from "wavesurfer.js";

const AudioWaveform = ({ audioURL }) => {
  const wavesurferRef = useRef(null);
  const [wavesurferObj, setWavesurferObj] = useState();
  useEffect(() => {
    if (wavesurferRef.current && !wavesurferObj) {
      setWavesurferObj(
        wavesurfer.create({
          container: "#waveform",
          scrollParent: true,
          autoCenter: true,
          cursorColor: "violet",
          loopSelection: true,
          waveColor: "#211027",
          progressColor: "#69207F",
          responsive: true,
        })
      );
    }
  }, [wavesurferObj, wavesurferRef]);
  useEffect(() => {
    if (audioURL && wavesurferObj) {
      wavesurferObj.load(audioURL);
    }
  }, [audioURL, wavesurferObj]);
  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.on("click", () => {
        wavesurferObj.play();
      });
    }
  }, [wavesurferObj]);
  return (
    <div>
      <div ref={wavesurferRef} id="waveform" />
    </div>
  );
};

export default AudioWaveform;
