import React from "react";
import { AudioContextProvider } from "./audioContext";
import { SuspendResumeButtons } from "./SuspendResumeButtons";
import { Synth } from "./Synth";

const audioContext = new AudioContext();
audioContext.suspend();

export const App: React.FunctionComponent = () => {
  return (
    <AudioContextProvider value={audioContext}>
      <SuspendResumeButtons />
      <Synth />
    </AudioContextProvider>
  );
};
