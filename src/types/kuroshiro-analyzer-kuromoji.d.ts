// types/kuroshiro-analyzer-kuromoji.d.ts

declare module "kuromoji" {
        export interface Analyzer { tokenize: (s: string) => any[]; }
        export function builder(opts?: { dicPath?: string }): { build(cb: (err: any, analyzer: Analyzer) => void): void; };
        const _default: { builder: typeof builder };
        export default _default;
}


declare module "kuroshiro-analyzer-kuromoji" {
        /**
         * Opciones para el constructor
         */
        export interface AnalyzerOptions {
                dictPath?: string;
        }

        /**
         * Token resultante del análisis morfológico (basado en el ejemplo JS)
         */
        export interface TokenVerbose {
                word_id?: number;
                word_type?: string;
                word_position?: number;
                [key: string]: any;
        }

        export interface Token {
                surface_form: string;
                pos: string;
                pos_detail_1?: string;
                pos_detail_2?: string;
                pos_detail_3?: string;
                conjugated_type?: string;
                conjugated_form?: string;
                basic_form?: string;
                reading?: string;
                pronunciation?: string;
                verbose?: TokenVerbose;
                // Permitir propiedades adicionales que kuromoji pueda devolver
                [key: string]: any;
        }

        /**
         * Analyzer exportado por defecto
         */
        export default class Analyzer {
                constructor(options?: AnalyzerOptions);
                /**
                 * Inicializa el analizador (construye el diccionario)
                 */
                init(): Promise<void>;
                /**
                 * Analiza la cadena y devuelve un array de tokens
                 * @param str cadena a analizar
                 */
                parse(str?: string): Promise<Token[]>;
        }
}
