declare module "kuroshiro" {
        type ToOption = 'hiragana' | 'katakana' | 'romaji';
        type ModeOption = 'normal' | 'spaced' | 'okurigana' | 'furigana';
        type RomanizationSystem = 'nippon' | 'passport' | 'hepburn';

        export default class Kuroshiro {
                constructor();
                init(analyzer?: any): Promise<void>;
                convert(
                        text: string,
                        options?: {
                                to?: ToOption;
                                mode?: ModeOption;
                                romajiSystem?: RomanizationSystem;
                                delimiter_start?: string;
                                delimiter_end?: string;
                        }
                ): Promise<string>;
                
                static Util: {
                        isHiragana: (ch: string) => boolean
                        isKatakana: (ch: string) => boolean
                        isKana: (ch: string) => boolean
                        isKanji: (ch: string) => boolean
                        isJapanese: (ch: string) => boolean
                        hasHiragana: (ch: string) => boolean
                        hasKatakana: (ch: string) => boolean
                        hasKana: (ch: string) => boolean
                        hasKanji: (ch: string) => boolean
                        hasJapanese: (ch: string) => boolean
                        kanaToHiragna: (text: string) => string
                        kanaToKatakana: (text: string) => string
                        kanaToRomaji: (text: string, system: RomanizationSystem) => string
                }
        }
}