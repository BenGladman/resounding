import React from "react";
import { ConnectionContextProvider } from "./connection";
import { Master, Vibrato } from "./modules";
import { Oscillator } from "./nodes";

export const Synth: React.FunctionComponent = () => {
  return (
    <ConnectionContextProvider>
      <Master name="master" gainParam="master.gain" />
      <Oscillator
        connectTo="master"
        type="triangle"
        frequency={330}
        frequencyParam="hfo1.frequency"
      />
      <Vibrato connectTo="hfo1.frequency" depth={2} frequency={7} />
      <Oscillator
        connectTo="master"
        type="triangle"
        frequency={220}
        frequencyParam="hfo2.frequency"
      />
      <Vibrato connectTo="hfo2.frequency" depth={50} frequency={2} />
      <Oscillator
        connectTo="master.gain"
        frequency={2}
        frequencyParam="lfo3.frequency"
      />
      <Oscillator connectTo="lfo3.frequency" type="square" frequency={0.2} />
    </ConnectionContextProvider>
  );
};
