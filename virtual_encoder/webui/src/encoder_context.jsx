import { createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { fetch_status_stream } from "./encoder_api";

export const EncoderContext = createContext();

export function useEncoder() {
  const context = useContext(EncoderContext);

  useEffect(() => fetch_status_stream(context.set_status, context.error_status), []);

  return context;

}
