import { Exception } from "./exception";
import { Provider } from "./providers/common";

export type Lyric = {
    id?: string;
    provider?: Provider;
    exception?: Exception;
    syncedLyric?: string[];
    plainLyric?: string[];
    lang?: string;
    instrumental?: boolean;
}
