import React, { FunctionComponent } from "react";
import { ConnectTo, useConnection } from "../connection";
import { useAudioNode } from "./audioNode";

type Props = {
  connectTo: ConnectTo;
  gain?: number;
};

export function useGainNode() {
  return useAudioNode(
    api => api.createGain(),

    (node): FunctionComponent<Props> => ({ connectTo, gain }) => {
      useConnection(node, connectTo);

      if (gain !== undefined) {
        node.gain.value = gain;
      }

      return (
        <div>
          <h2>Gain Node</h2>
          <dl>
            <dt>gain</dt>
            <dd>{gain}</dd>
          </dl>
        </div>
      );
    },

    node => ({ displayName: "Gain", node, gain: node.gain })
  );
}
