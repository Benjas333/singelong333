import axios from "axios";
import { Lyric } from "../../types/lyric";
import { Playing } from "../../types/playing";
import { Provider } from "../../types/providers/common";
import { LrclibSearchSong } from "../../types/providers/lrclib";
import { romanize } from "../romanize";


export const fetchLRCLIB = async (playing: Playing): Promise<Lyric> => {
        const response: Lyric = {
                id: playing.id,
                provider: Provider.LRCLIB
        }
        const url = `https://lrclib.net/api/search?artist_name=${playing.artistName?.replaceAll(
                " ",
                "+"
        )}&track_name=${playing.songTitle?.replaceAll(" ", "+")}`;
        // console.log(`Requesting lyrics to: ${url}`);
        let result: axios.AxiosResponse<LrclibSearchSong[]>;
        try {
                result = await axios.get<LrclibSearchSong[]>(url);
        } catch (error: any) {
                const err = error as axios.AxiosError;
                response.exception = {
                        code: err.response?.status ?? 404,
                        message: err.response ? `${err.response.data}` : err.message
                }
                return response;
        }
        const songs = result.data;
        // console.log(songs);
        if (!Array.isArray(songs) || !songs.length) {
                response.exception = {
                        code: 404,
                        message: 'Cannot find track'
                }
                return response;
        }

        const closest = songs.find(song => song.syncedLyrics)
        if (closest) {
                response.syncedLyric = closest.syncedLyrics
                response.plainLyric = closest.plainLyrics
        }
        if (!response.plainLyric) {
                const plain = songs.find(song => song.plainLyrics)
                if (plain) {
                        response.plainLyric = plain.plainLyrics
                }
        }
        if (!response.syncedLyric && !response.plainLyric) {
                response.exception = {
                        code: 404,
                        message: 'No lyrics'
                }
                return response;
        }
        
        return await romanize(response);
};
