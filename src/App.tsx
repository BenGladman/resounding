import React from "react";
import { AudioContextProvider } from "./AudioContext";
import { AudioDestinationNode } from "./AudioDestinationNode";
import { GainNode } from "./GainNode";
import { OscillatorNode } from "./OscillatorNode";
import { SuspendResumeButtons } from "./SuspendResumeButtons";

const audioContext = new AudioContext();
audioContext.suspend();

export const App: React.FunctionComponent = () => (
  <AudioContextProvider value={audioContext}>
    <SuspendResumeButtons />
    <AudioDestinationNode>
      {destination => (
        <GainNode connectTo={destination} gain={0.5}>
          {gain => (
            <>
              <OscillatorNode connectTo={gain} frequency={330}>
                {oscillator => (
                  <GainNode connectTo={oscillator.frequency} gain={2}>
                    {gain2 => (
                      <OscillatorNode connectTo={gain2} frequency={7} />
                    )}
                  </GainNode>
                )}
              </OscillatorNode>
              <OscillatorNode connectTo={gain} type="triangle" frequency={220}>
                {oscillator => (
                  <GainNode connectTo={oscillator.frequency} gain={50}>
                    {gain2 => (
                      <OscillatorNode connectTo={gain2} frequency={2} />
                    )}
                  </GainNode>
                )}
              </OscillatorNode>
              <OscillatorNode connectTo={gain.gain} frequency={1} />
            </>
          )}
        </GainNode>
      )}
    </AudioDestinationNode>
  </AudioContextProvider>
);
