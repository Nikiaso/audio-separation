const Banner = () => {
  const img_url =
    "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="relative mt-24">
      <img src={img_url} className="rounded-lg shadow-2xl" />
      <h1 className="absolute left-10 bottom-32 text-5xl">
        Upload an audio files to dissect
      </h1>
      <h1 className="absolute left-10 bottom-16 text-md text-left w-5/6">
        Choose the number of stems you want to create. We will process your
        audio and dissect it. Download the stems and use them to remix, sample
        or create new music.
      </h1>
    </div>
  );
};

export default Banner;
