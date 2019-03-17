import React, { FunctionComponent, useEffect, useState } from "react";
import { useAudioContext } from "../audioContext";
import { useConnection, useConnectionDestination } from "../connection";

type Props = {
  connectTo?: string;
  frequency?: number;
  frequencyParam?: string;
  type?: OscillatorNode["type"];
};

export const Oscillator: FunctionComponent<Props> = ({
  connectTo,
  frequency,
  frequencyParam,
  type
}) => {
  const api = useAudioContext();
  const [node] = useState(() => api.createOscillator());
  useConnection(node, connectTo);
  useConnectionDestination(node.frequency, frequencyParam);

  useEffect(() => {
    if (frequency !== undefined) {
      node.frequency.value = frequency;
    }
  }, [node, frequency]);

  useEffect(() => {
    if (type !== undefined) {
      node.type = type;
    }
  }, [node, type]);

  useEffect(() => {
    node.start();
    return () => {
      node.stop();
    };
  }, [node]);

  return (
    <div>
      <h2>Oscillator Node</h2>
      <dl>
        <dt>type</dt>
        <dd>{type}</dd>
        <dt>frequency</dt>
        <dd>{frequency}</dd>
      </dl>
    </div>
  );
};
