import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoCloudDownloadOutline } from "react-icons/io5";

const HowItWorks = () => {
  return (
    <>
      <h1 className="font-bold text-3xl mb-6">How it works</h1>
      <div className="flex mb-16">
        <div className="w-full border p-5 rounded-xl border-slate-600">
          <AiOutlineCloudUpload size={32} />
          <h1 className="font-bold my-3">Upload</h1>
          <h1>Upload your audio file.</h1>
        </div>
        <div className="w-full border mx-3 p-5 rounded-xl border-slate-600">
          <CiSettings size={32} />
          <h1 className="font-bold my-3">Process</h1>
          <h1>We will process your audio and create your stems.</h1>
        </div>
        <div className="w-full border p-5 rounded-xl border-slate-600">
          <IoCloudDownloadOutline size={32} />
          <h1 className="font-bold my-3">Download</h1>
          <h1>Download your stems and use them.</h1>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
