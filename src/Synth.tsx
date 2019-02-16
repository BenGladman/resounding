import React from "react";
import { useAudioDestinationNode } from "./audioDestinationNode";
import { useGainNode } from "./gainNode";
import { useOscillatorNode } from "./oscillatorNode";

export const Synth: React.FunctionComponent = () => {
  const AudioDestination = useAudioDestinationNode();
  const MasterGain = useGainNode();
  const Gain2 = useGainNode();
  const Gain3 = useGainNode();
  const Hfo1 = useOscillatorNode();
  const Hfo2 = useOscillatorNode();
  const Lfo1 = useOscillatorNode();
  const Lfo2 = useOscillatorNode();
  const Lfo3 = useOscillatorNode();
  const Lfo4 = useOscillatorNode();

  return (
    <>
      <AudioDestination />
      <MasterGain connectTo={AudioDestination.node} gain={0.5} />
      <Hfo1 connectTo={MasterGain.node} type="triangle" frequency={330} />
      <Gain2 connectTo={Hfo1.frequency} gain={2} />
      <Lfo1 connectTo={Gain2.node} frequency={7} />
      <Hfo2 connectTo={MasterGain.node} type="triangle" frequency={220} />
      <Gain3 connectTo={Hfo2.frequency} gain={50} />
      <Lfo2 connectTo={Gain3.node} frequency={2} />
      <Lfo3 connectTo={MasterGain.gain} frequency={2} />
      <Lfo4 connectTo={Lfo3.frequency} type="square" frequency={0.2} />
    </>
  );
};
