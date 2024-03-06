import { useState, useRef } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { PiWaveformBold } from "react-icons/pi";
import AudioWaveform from "./AudioWaveform";
import ProcessedAudio from "./ProcessedAudio";
const AudioUploader = () => {
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isProcessed, setIsProcessed] = useState(false);
  const toast = useToast();
  const inputFile = useRef(null);
  const [processedAudioData, setProcessedAudioData] = useState(null);
  const uploadAudio = (audio) => {
    setLoading(true);
    if (audio === undefined) {
      toast({
        title: "Please select audio file!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (audio.type === "audio/mpeg" || audio.type === "audio/wav") {
      const data = new FormData();
      data.append("file", audio);
      data.append("upload_preset", "audio-separation");
      data.append("cloud_name", "dmzqmxi2w");
      fetch("https://api.cloudinary.com/v1_1/dmzqmxi2w/video/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setAudio(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select audio file!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    if (!audio) {
      toast({
        title: "Please upload audio file!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios
        .post(
          "http://localhost:3000/api/audio-separation/processAudio",
          { audio },
          config
        )
        .then((res) => {
          setProcessedAudioData(res);
        });
      toast({
        title: "Uploaded Audio!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsProcessed(true);
      // localStorage.setItem("audioInfo", JSON.stringify(data));
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (processedAudioData) {
    console.log(processedAudioData);
    console.log(processedAudioData.data.processedData[0]);
    console.log(processedAudioData.data.processedData[1]);
  }
  return (
    <Stack>
      <PiWaveformBold className="w-full h-24 mt-16" />
      {audio ? (
        <AudioWaveform audioURL={audio} />
      ) : (
        <>
          <h1 className="text-center mt-6 text-4xl">Upload an audio file</h1>
          <div className="w-1/8 flex justify-center m-auto my-9">
            <FormControl id="audio" className="rounded-sm ml-7">
              <FormLabel className=" bg-black text-white py-2 px-4 upload-label">
                Upload
              </FormLabel>
              <Input
                type="file"
                accept="audio/*"
                className="messed-input opacity-0"
                ref={inputFile}
                onChange={(e) => uploadAudio(e.target.files[0])}
              />
            </FormControl>
          </div>
        </>
      )}
      <Stack spacing="6">
        {isProcessed && processedAudioData ? (
          <ProcessedAudio
            processedAudioData={processedAudioData.data.processedData}
          />
        ) : (
          <Button width="100%" className="process-btn" onClick={submitHandler}>
            Process Audio
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default AudioUploader;
