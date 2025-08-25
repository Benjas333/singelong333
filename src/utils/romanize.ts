import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import * as vscode from "vscode";
import { Lyric } from "../types/lyric";

let kuroshiro: Kuroshiro | null = null;

const getKuroshiro = async (): Promise<Kuroshiro> => {
        if (kuroshiro !== null) return kuroshiro;

        kuroshiro = new Kuroshiro();
        await kuroshiro.init(new KuromojiAnalyzer());
        return kuroshiro;
};

let notified = false;
const notify = () => {
        if (notified) return;
        
        vscode.window.showInformationMessage("Romanizing lyrics locally...");
        notified = true
}

export const romanize = async (lyric: Lyric): Promise<Lyric> => {
        if (lyric.exception) return lyric;
        
        const kuro = await getKuroshiro();
        if (lyric.plainLyric) {
                const convertedPlainLyrics = await convertJapaneseText(lyric.plainLyric, kuro);
                lyric.plainLyric = convertedPlainLyrics
        }
        if (lyric.syncedLyric) {
                const lines = lyric.syncedLyric.split("\n");
                const convertedSyncedLines = await Promise.all(
                        lines.map(async (line) => {
                                const match = line.trim().match(/\[\d+:\d+.\d+\] (.*)/);
                                if (match === null || match.length < 2) return line;
                                const converted = await convertJapaneseText(match[1], kuro);
                                if (converted === match[1]) return line;
                                return line.replace(match[1], converted);
                        })
                );
                lyric.syncedLyric = convertedSyncedLines.join("\n");
        }
        notified = false;
        return lyric;
};

const convertJapaneseText = async (text: string, converter: Kuroshiro): Promise<string> => {
        if (!Kuroshiro.Util.hasJapanese(text)) return text
        notify()

        try {
                return await converter.convert(text, {
                        to: 'romaji',
                        mode: 'spaced',
                        romajiSystem: 'passport'
                });
        } catch (error) {
                vscode.window.showWarningMessage(`${error}`);
                return text;
        }
}
