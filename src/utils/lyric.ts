import { Playing } from "../types/playing";
import { Lyric } from "../types/lyric";
import { fetchNetease } from "./providers/netease";
import { fetchMusixMatch } from "./providers/musix-match";
import { fetchLRCLIB } from "./providers/lrclib";

const logProviderResponse = (response: Lyric) => {
    const func = response.exception ? console.warn : console.info;
    func(response);
};


export const getLyric = async (playing: Playing): Promise<Lyric> => {
    try {
        // Fetch Netease
        const chinese = await fetchNetease(playing);
        logProviderResponse(chinese);
        if (chinese.syncedLyric) {
            console.log(`SYNCED LYRICS FROM ${chinese.provider?.toUpperCase()}`);
            return chinese;
        }

        
        // Fetch MusixMatch
        const musixmatch = await fetchMusixMatch(playing);
        logProviderResponse(musixmatch);
        if (musixmatch.syncedLyric) {
            console.log(`SYNCED LYRICS FROM ${musixmatch.provider?.toUpperCase()}`);
            return musixmatch;
        }


        // Fetch LRCLIB
        const lrclib = await fetchLRCLIB(playing);
        logProviderResponse(lrclib);
        if (lrclib.syncedLyric) {
            console.log(`SYNCED LYRICS FROM ${lrclib.provider?.toUpperCase()}`);
            return lrclib;
        }

        // TODO: Fetch Genius

        if (chinese.plainLyric) {
            console.log(`PLAIN LYRICS FROM ${chinese.provider?.toUpperCase()}`);
            return chinese;
        }
        else if (musixmatch.plainLyric) {
            console.log(`PLAIN LYRICS FROM ${musixmatch.provider?.toUpperCase()}`);
            return musixmatch;
        }
        else if (lrclib.plainLyric) {
            console.log(`PLAIN LYRICS FROM ${lrclib.provider?.toUpperCase()}`);
            return lrclib;
        }


        throw new Error(`Lyrics not found in any provider for: ${playing.songTitle} (${playing.artistName})`);
    } catch (e: any) {
        return { id: playing.id, exception: { code: 404, message: `${e?.stack ?? e}` } };
    }
};
