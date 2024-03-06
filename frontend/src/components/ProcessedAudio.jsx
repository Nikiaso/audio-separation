import AudioWaveform from "./AudioWaveform";

const ProcessedAudio = ({ processedAudioData }) => {
  return (
    <>
      <div>
        <AudioWaveform audioURL={processedAudioData[0]} />
      </div>
      <div>
        <AudioWaveform audioURL={processedAudioData[1]} />
      </div>
    </>
  );
};

export default ProcessedAudio;
