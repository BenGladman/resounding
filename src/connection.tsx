import React, { useContext, useEffect, useReducer, useState } from "react";

type ConnectionDestination = AudioParam | AudioNode;

type ConnectionState = Readonly<Record<string, ConnectionDestination>>;

type Action =
  | { type: "add"; name: string; destination: ConnectionDestination }
  | { type: "remove"; name: string };

type ConnectorsContextType = [ConnectionState, React.Dispatch<Action>];

const ConnectionContext = React.createContext<ConnectorsContextType>([
  {},
  () => undefined
]);

function connectionReducer(state: ConnectionState, action: Action) {
  switch (action.type) {
    case "add":
      if (!state[action.name] || state[action.name] !== action.destination) {
        return {
          ...state,
          [action.name]: action.destination
        };
      }
      return state;
    case "remove":
      if (state[action.name]) {
        const { [action.name]: remove, ...newState } = state;
        return newState;
      }
      return state;
    default:
      throw Error("Invalid action type");
  }
}

export const ConnectionContextProvider: React.FunctionComponent = ({
  children
}) => {
  const connectors = useReducer(connectionReducer, {});
  return (
    <ConnectionContext.Provider value={connectors}>
      {children}
    </ConnectionContext.Provider>
  );
};

export function useConnection(node: AudioNode, name: string | undefined) {
  const [connectors] = useContext(ConnectionContext);
  const destination = name && name in connectors ? connectors[name] : null;

  useEffect(() => {
    if (destination instanceof AudioNode) {
      node.connect(destination);
      return () => node.disconnect(destination);
    }
    if (destination instanceof AudioParam) {
      node.connect(destination);
      return () => node.disconnect(destination);
    }
    return undefined;
  }, [node, destination]);
}

export function useConnectionDestination(
  destination: ConnectionDestination,
  name: string | undefined
) {
  const [, dispatch] = useContext(ConnectionContext);
  useEffect(() => {
    if (name) {
      dispatch({ type: "add", name, destination });
      return () => dispatch({ type: "remove", name });
    }
    return undefined;
  }, [name, destination]);
}

let nameCounter = 0;
export function useName(prefix: string) {
  const [name] = useState(() => `G${++nameCounter}/${prefix}`);
  return name;
}
