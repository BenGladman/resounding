import { useEffect, useImperativeHandle, useMemo } from "react";
import { useAudioContext } from "./AudioContext";

export type ConnectTo = (() => AudioNode | AudioParam | null) | null;

export function useAudioNode<T extends AudioNode>(
  getAudioNode: (api: AudioContext) => T,
  connectTo: ConnectTo,
  ref?: React.Ref<T>
): T {
  const audioContext = useAudioContext();
  const node = useMemo(() => getAudioNode(audioContext), [audioContext]);

  useEffect(() => {
    const destination = connectTo && connectTo();
    if (destination instanceof AudioNode) {
      node.connect(destination);
    } else if (destination instanceof AudioParam) {
      node.connect(destination);
    }
    return () => {
      node.disconnect();
    };
  }, [node, connectTo]);

  useImperativeHandle(ref, () => node);

  return node;
}
