import React, { FunctionComponent } from "react";
import { useAudioContext } from "../audioContext";
import { useConnectionDestination } from "../connection";

type Props = {
  name: string;
};

export const AudioDestination: FunctionComponent<Props> = ({ name }) => {
  const api = useAudioContext();
  useConnectionDestination(api.destination, name);

  return (
    <div>
      <h2>Audio Destination Node</h2>
    </div>
  );
};
