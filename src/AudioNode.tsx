import { useEffect, useMemo } from "react";
import { useAudioContext } from "./AudioContext";

export function useAudioNode<T extends AudioNode>(
  getAudioNode: (api: AudioContext) => T,
  connectTo?: AudioNode | AudioParam
): T {
  const audioContext = useAudioContext();
  const node = useMemo(() => getAudioNode(audioContext), [audioContext]);

  useEffect(() => {
    if (connectTo instanceof AudioNode) {
      node.connect(connectTo);
    } else if (connectTo instanceof AudioParam) {
      node.connect(connectTo);
    }
    return () => {
      node.disconnect();
    };
  }, [node, connectTo]);

  return node;
}
