import AudioUploader from "../components/AudioUploader.jsx";
import NavBar from "../components/NavBar.jsx";
import Banner from "../components/Banner.jsx";
import Footer from "../components/Footer.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
const HomePage = () => {
  const handleAudioUpload = (file) => {
    console.log("Uploaded audio file:", file);
  };
  return (
    <div>
      <NavBar />
      <hr />
      <div className="max-w-screen-lg m-auto">
        <Banner />
        <AudioUploader onUpload={handleAudioUpload} />
        <HowItWorks />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
