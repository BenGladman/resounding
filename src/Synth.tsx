import React from "react";
import { useMasterModule, useVibratoModule } from "./modules";
import { useOscillatorNode } from "./nodes";

export const Synth: React.FunctionComponent = () => {
  const Master = useMasterModule();
  const Vibrato1 = useVibratoModule();
  const Vibrato2 = useVibratoModule();
  const Hfo1 = useOscillatorNode();
  const Hfo2 = useOscillatorNode();
  const Lfo3 = useOscillatorNode();
  const Lfo4 = useOscillatorNode();

  return (
    <>
      <Master />
      <Hfo1 connectTo={Master.node} type="triangle" frequency={330} />
      <Vibrato1 connectTo={Hfo1.frequency} depth={2} frequency={7} />
      <Hfo2 connectTo={Master.node} type="triangle" frequency={220} />
      <Vibrato2 connectTo={Hfo2.frequency} depth={50} frequency={2} />
      <Lfo3 connectTo={Master.gain} frequency={2} />
      <Lfo4 connectTo={Lfo3.frequency} type="square" frequency={0.2} />
    </>
  );
};
