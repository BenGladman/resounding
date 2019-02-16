import { useMemo } from "react";
import { useAudioContext } from "../audioContext";

export function useAudioNode<
  ComponentType extends React.ComponentType<any>,
  Statics extends object,
  T extends AudioNode
>(
  getAudioNode: (api: AudioContext) => T,
  createComponent: (node: T) => ComponentType,
  createStatics: (node: T) => Statics
): ComponentType & Statics {
  const audioContext = useAudioContext();
  const node = useMemo(() => getAudioNode(audioContext), [audioContext]);

  const Component = useMemo(
    () => Object.assign(createComponent(node), createStatics(node)),
    [node]
  );

  return Component;
}
