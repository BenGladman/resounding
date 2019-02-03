import React from "react";
import { useAudioNode } from "./AudioNode";

type Props = {
  children?: (node: AudioDestinationNode) => React.ReactElement<any>;
};

export const AudioDestinationNode: React.FunctionComponent<Props> = ({
  children
}) => {
  const node = useAudioNode(api => api.destination);
  return (
    <div>
      <h2>Audio Destination Node</h2>
      <dl>
        <dt>children</dt>
        <dd>{children && children(node)}</dd>
      </dl>
    </div>
  );
};
