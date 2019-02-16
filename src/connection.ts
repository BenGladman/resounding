import { useEffect } from "react";

export type ConnectTo = AudioNode | AudioParam | null;

export function useConnection(node: AudioNode, connectTo: ConnectTo) {
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
}
