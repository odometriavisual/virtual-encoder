import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { fetch_status_stream } from "./encoder_api";

export const EncoderContext = createContext();

export function useEncoder() {
  useEffect(() => fetch_status_stream(set_status, error_status), []);

  return useContext(EncoderContext);
}
