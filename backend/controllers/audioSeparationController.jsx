const asyncHandler = require("express-async-handler");
const path = require("path");
const { exec } = require("child_process");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { stdout, stderr } = require("process");

const processAudio = asyncHandler((req, res) => {
  const { audio } = req.body;
  var localFileName = audio.substring(audio.lastIndexOf("/") + 1);
  var inputAudioPath = path.join(__dirname, "../input", localFileName);
  var outputAudioPath = path.join(__dirname, "../output");
  let resultantOutput = [];
  // Configure Cloudinary with your credentials
  cloudinary.config({
    cloud_name: "dmzqmxi2w",
    api_key: "485572792155466",
    api_secret: "h56nKVm-GIKxsCK6e2e-l-TA3Ec",
  });

  exec(`curl -o ${inputAudioPath} ${audio}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error downloading file: ${error.message}`);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(`File downloaded!`, inputAudioPath);
      debugger;
      exec(
        `python -m spleeter separate -p spleeter:2stems -o ${outputAudioPath} ${inputAudioPath}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: "Internal server error" });
          }
          const outputFolderPath = path.join(
            outputAudioPath,
            localFileName.split(".")[0]
          );

          //  upload output to cloudinary

          const vocalfilePath = path.join(outputFolderPath, "vocals.wav");
          cloudinary.uploader.upload(
            vocalfilePath,
            { resource_type: "auto" },
            (error, response) => {
              if (error) {
                console.error("Error uploading file:", error);
              } else {
                console.log("Upload successful.");
                resultantOutput.push(response.url);
                console.log(response);
              }
            }
          );
          const accompanimentfilePath = path.join(
            outputFolderPath,
            "accompaniment.wav"
          );
          cloudinary.uploader.upload(
            accompanimentfilePath,
            { resource_type: "auto" },
            (error, response) => {
              if (error) {
                console.error("Error uploading file:", error);
              } else {
                console.log("Upload successful.");
                resultantOutput.push(response.url);
                console.log(response);
                res.json({
                  message: "Separation completed",
                  processedData: resultantOutput,
                });
              }
            }
          );
        }
      );
    }
  });
  // res.json({ message: "Separation completed" });
});

module.exports = { processAudio };
