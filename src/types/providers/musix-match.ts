
interface header {
        status_code: number;
        execute_time?: number;
}

interface CommonBody {
        instrumental?: number
        restricted: number
        updated_time: string
}

interface CommonTrackingBody extends CommonBody {
        html_tracking_url: string
        pixel_tracking_url: string
        script_tracking_url: string
}

interface CommonLyricsBody extends CommonTrackingBody {
        lyrics_copyright: string
        published_status: number
        publisher_list: unknown[]
        writer_list: unknown[]
}

interface TrackLyricsGetBody extends CommonLyricsBody {
        action_requested: string
        backlink_url: string
        can_edit: number
        check_validation_overridable: number
        explicit: number
        locked: number
        lyrics_body: string
        lyrics_id: number
        lyrics_language: string
        lyrics_language_description: string
        verified: number
}

interface TrackLyricsGet {
        message: {
                header: header
                body?: {
                        lyrics: TrackLyricsGetBody
                } | []
        }
}

interface TrackSnippetGetBody extends CommonTrackingBody {
        snippet_id: number
        snippet_body: string
        snippet_language: string
}

interface TrackSnippetGet {
        message: {
                header: header
                body?: {
                        snippet: TrackSnippetGetBody
                }
        }
}

interface subtitlesHeader extends header {
        instrumental?: number
        available?: number
}

interface TrackSubtitlesGetBody extends CommonLyricsBody {
        subtitle_id: number
        subtitle_language: string
        subtitle_language_description: string
        subtitle_length: number
        subtitle_avg_count: number
        subtitle_body: string
}

interface TrackSubtitlesGet {
        message: {
                header: subtitlesHeader,
                body?: [] | {
                        subtitle_list: {
                                subtitle: TrackSubtitlesGetBody
                        }[]
                }
        }
}

interface MatcherTrackGetHeader extends header {
        cached?: number
        confidence?: number
        mode?: string
}

interface MusicGenre {
        music_genre_id: number
        music_genre_parent_id: number
        music_genre_name: string
        music_genre_name_extended: string
        music_genre_vanity: string
}

interface GenresList {
        music_genre_list: {
                music_genre: MusicGenre
        }[]
}

interface MatcherTrackGetBody extends CommonBody {
        album_coverart_100x100: string
        album_coverart_350x350: string
        album_coverart_500x500: string
        album_coverart_800x800: string
        album_id: number
        album_name: string
        album_vanity_id: string
        artist_id: number
        artist_mbid: string
        artist_name: string
        commontrack_7digital_ids: number[]
        commontrack_id: number
        commontrack_isrcs: string[][]
        commontrack_itunes_ids: number[]
        commontrack_spotify_ids: string[]
        commontrack_vanity_id: string
        explicit: number
        first_release_date: string
        has_lyrics_crowd: number
        has_lyrics: number
        has_richsync: number
        has_subtitles: number
        has_track_structure: number
        lyrics_id: number
        num_favourite: number
        primary_genres: GenresList
        secondary_genres: GenresList
        subtitle_id: number
        track_edit_url: string
        track_id: number
        track_isrc: string
        track_length: number
        track_mbid: string
        track_name: string
        track_name_translation_list: {
                track_name_translation: {
                        language: string
                        translation: string
                }
        }[]
        track_rating: number
        track_share_url: string
        track_soundcloud_id: number
        track_spotify_id: string
        track_xboxmusic_id: string
}

interface MatcherTrackGet {
        message: {
                header: MatcherTrackGetHeader,
                body: [] | {
                        track: MatcherTrackGetBody
                }
        }
}

interface meta {
        status_code: number;
        last_updated: string;
}

interface UserBlobGet {
        message: {
                header: header
        },
        meta: meta
}

interface macro_calls {
        'matcher.track.get': MatcherTrackGet;
        'track.lyrics.get': TrackLyricsGet;
        'track.snippet.get': TrackSnippetGet;
        'track.subtitles.get': TrackSubtitlesGet;
        'userblob.get': UserBlobGet;
}

interface MacroHeader extends header {
        pid?: number;
        surrogate_key_list?: unknown[];
        hint?: string;
}

export interface MusixMatchMacroResponse {
        message: {
                header: MacroHeader,
                body: {
                        macro_calls: macro_calls
                }
        }
}
