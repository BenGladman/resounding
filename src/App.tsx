import React from "react";
import { AudioContextProvider } from "./AudioContext";
import {
  AudioDestinationNode,
  useAudioDestination
} from "./AudioDestinationNode";
import { GainNode, useGain } from "./GainNode";
import { OscillatorNode, useOscillator } from "./OscillatorNode";
import { SuspendResumeButtons } from "./SuspendResumeButtons";

const audioContext = new AudioContext();
audioContext.suspend();

export const App: React.FunctionComponent = () => {
  const audioDestination = useAudioDestination();
  const masterGain = useGain();
  const gain2 = useGain();
  const gain3 = useGain();
  const hfo1 = useOscillator();
  const hfo2 = useOscillator();
  const lfo1 = useOscillator();

  return (
    <AudioContextProvider value={audioContext}>
      <SuspendResumeButtons />

      <AudioDestinationNode ref={audioDestination.ref} />

      <GainNode
        ref={masterGain.ref}
        connectTo={audioDestination.input}
        gain={0.5}
      />

      <OscillatorNode
        ref={hfo1.ref}
        connectTo={masterGain.input}
        type="triangle"
        frequency={330}
      />

      <GainNode ref={gain2.ref} connectTo={hfo1.frequency} gain={2} />

      <OscillatorNode connectTo={gain2.input} frequency={7} />

      <OscillatorNode
        ref={hfo2.ref}
        connectTo={masterGain.input}
        type="triangle"
        frequency={220}
      />

      <GainNode ref={gain3.ref} connectTo={hfo2.frequency} gain={50} />

      <OscillatorNode connectTo={gain3.input} frequency={2} />

      <OscillatorNode
        ref={lfo1.ref}
        connectTo={masterGain.gain}
        frequency={2}
      />

      <OscillatorNode
        connectTo={lfo1.frequency}
        type="square"
        frequency={0.2}
      />
    </AudioContextProvider>
  );
};
