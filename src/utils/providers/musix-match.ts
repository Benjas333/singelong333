import axios from "axios";
import { Lyric } from "../../types/lyric";
import { Playing } from "../../types/playing";
import { Provider } from "../../types/providers/common";
import { logToPasteBin } from "../pastebin";
import { MusixMatchMacroResponse } from "../../types/providers/musix-match";
import { romanizeLyrics } from "../romanize";

const msxmatchToken = "2005218b74f939209bda92cb633c7380612e14cb7fe92dcd6a780f";
const msxmatchUrl =
        "https://apic-desktop.musixmatch.com/ws/1.1/macro.subtitles.get?format=json&namespace=lyrics_synched&subtitle_format=lrc&app_id=web-desktop-app-v1.0";

export const fetchMusixMatch = async (playing: Playing): Promise<Lyric> => {
        const response: Lyric = {
                id: playing.id,
                provider: Provider.MusixMatch,
        };
        const msxmatchParam = `&q_artist=${playing.artistName}&q_track=${playing.songTitle}&usertoken=${msxmatchToken}`;
        const finalUrl = msxmatchUrl + msxmatchParam;
        let result: axios.AxiosResponse<MusixMatchMacroResponse>;
        try {
                result = await axios.get<MusixMatchMacroResponse>(finalUrl, {
                        headers: {
                                authority: "apic-desktop.musixmatch.com",
                                cookie: "x-mxm-token-guid=",
                        },
                });
        } catch (error) {
                const err = error as axios.AxiosError;
                response.exception = {
                        code: err.response?.status ?? 404,
                        message: err.response ? `${err.response.data}` : err.message
                };
                return response;
        }
        const data = result.data;
        console.log(data);
        // logToPasteBin(`${playing.songTitle}-MusixMatch`, data);
        if (!data) {
                response.exception = {
                        code: result.status,
                        message: result.statusText,
                };
                return response;
        }

        const header = data.message.header;
        if (header.status_code !== 200) {
                response.exception = {
                        code: header.status_code,
                        message: header.hint || 'Unknown error'
                };
                return response;
        }

        const body = data.message.body;
        const syncedBody = body.macro_calls["track.subtitles.get"].message.body;
        if (syncedBody && !Array.isArray(syncedBody)) {
                const subtitleList = syncedBody.subtitle_list;
                if (subtitleList.length) {
                        const lyr = subtitleList[0].subtitle;
                        response.syncedLyric = lyr.subtitle_body.split('\n');
                        response.lang = lyr.subtitle_language;
                }
        }

        const plainBody = body.macro_calls['track.lyrics.get'].message.body;
        if (plainBody && !Array.isArray(plainBody)) {
                const lyr = plainBody.lyrics;
                response.plainLyric = lyr.lyrics_body.split('\n');
                response.instrumental ??= !!lyr.instrumental;
        }

        if (!response.plainLyric && !response.syncedLyric) {
                response.exception = {
                        code: 404,
                        message: 'No lyrics'
                };
                return response;
        }

        // TODO: Add translations retriever
        
        return await romanizeLyrics(response);
};
