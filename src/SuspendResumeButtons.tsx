import React from "react";
import { useAudioContext } from "./audioContext";

export const SuspendResumeButtons: React.FunctionComponent = () => {
  const audioContext = useAudioContext();
  return (
    <div>
      <button onClick={() => audioContext.resume()}>Resume</button>
      <button onClick={() => audioContext.suspend()}>Suspend</button>
    </div>
  );
};
