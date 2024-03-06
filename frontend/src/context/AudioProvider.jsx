import { createContext, useContext } from "react";
const AudioContext = createContext();
const AudioProvider = ({ children }) => {
  return <AudioContext.Provider value={}>{children}</AudioContext.Provider>;
};

export const AudioState = () => {
	return useContext(AudioContext);
};

export default AudioProvider;
