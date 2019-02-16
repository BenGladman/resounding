import { useMemo } from "react";

export function useAudioModule<
  ComponentType extends React.ComponentType<any>,
  Statics extends object
>(
  createComponent: () => ComponentType,
  createStatics: () => Statics
): ComponentType & Statics {
  const Component = useMemo(
    () => Object.assign(createComponent(), createStatics()),
    []
  );

  return Component;
}
