import { createContext } from "preact";
import { useContext } from "preact/hooks";

export const EncoderContext = createContext();

export function useEncoder() {
  return useContext(EncoderContext);
}
