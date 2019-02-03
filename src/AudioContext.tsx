import React, { useContext } from "react";

const AudioContextContext = React.createContext<AudioContext | null>(null);

export const AudioContextProvider = AudioContextContext.Provider;

export const useAudioContext = () => {
  const audioContext = useContext(AudioContextContext);
  if (audioContext === null) {
    throw Error("No audio context provided");
  }
  return audioContext;
};
