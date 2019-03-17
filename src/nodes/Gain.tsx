import React, { FunctionComponent, useEffect, useState } from "react";
import { useAudioContext } from "../audioContext";
import { useConnection, useConnectionDestination } from "../connection";

type Props = {
  connectTo?: string;
  name?: string;
  gain?: number;
  gainParam?: string;
};

export const Gain: FunctionComponent<Props> = ({
  connectTo,
  name,
  gain,
  gainParam
}) => {
  const api = useAudioContext();
  const [node] = useState(() => api.createGain());
  useConnection(node, connectTo);
  useConnectionDestination(node, name);
  useConnectionDestination(node.gain, gainParam);

  useEffect(() => {
    if (gain !== undefined) {
      node.gain.value = gain;
    }
  }, [node, gain]);

  return (
    <div>
      <h2>Gain Node</h2>
      <dl>
        <dt>gain</dt>
        <dd>{gain}</dd>
      </dl>
    </div>
  );
};
