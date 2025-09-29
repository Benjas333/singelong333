# Change Log

All notable changes to the "singelong333" extension will be documented in this file.

<!-- Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file. -->

## [Unreleased]

## [1.3.0] - 2025-09-29

### Added

- Romanization for Chinese, Korean, and Thai.
- First lyric (at 0:00) as emptyLyric.
- Instrumental song indicator and lyrics handling.

### Changed

- Improved romanization in general.
- Improved Japanese romanization.
- The project now uses esbuild for bundling.
- Promoted reload panel command and button from beta.
- Minor css style changes.
- syncedLyric and plainLyric are now of type array.
- Improved retrieving lyrics logging (?) (Actually not, but minor changes).

### Fixed

- Finally fixed auto scroll alignment.
- Removed kuromoji from external modules in esbuild.js.

## [1.2.1] - 2025-08-30

### Added

- Panel displays lyrics provider
- Reload panel command and button in context menu (promoted from debug only to casual use) (beta)
- Local romanization for MusixMatch lyrics
- Instrumental song detector (only for MusixMatch lyrics for now)
- Retrieving lyrics retry (30s) if the last one failed
- Some MusixMatch exception

### Changed

- Reduced the panel margin
- Panel now renders plain lyrics in case synced lyrics are not provided (improved logic)
- Split lyrics and progress logic into two isolated payloads
- Split the index.html panel into index.css and particles.js (probably index.js too in the future)
- Refactored the panel files into their own folder
- Reload panel command now refetchs lyrics too
- Improved LRCLIB lyrics logic
- Improved MusixMatch lyrics logic
- Slightly improved romanization logic
- Updated README.md

### Removed

- particles.json was not being used (I think)

### Fixed

- Chorus lyrics sometimes not playing animation
- Auto scrolling lyrics misaligned (I tried my best, but it's still not centered for some reason TuT)
- If a provider didn't retrieve synced lyrics but successfully retrieved plain lyrics, those were accidentally used without checking synced lyrics from other providers
- Extra blank spaces in Japanese romanized lyrics
- Some typos
- Error and traceback displaying in panel
- MusixMatch plain lyrics logic
- MusixMatch types

## [1.2.0] - 2025-08-25

### Added

- Reload panel command (for debugging only lol)
- Reload panel in panel context menu
- PasteBin logging (for debugging only lol)
- Providers now give both synced and plain lyrics (for future changes)
- Lyrics now include provider (not displayed anywhere yet)
- Api response types

### Changed

- Repo rebrand to /singelong333
- Merged Singelong new changes
- Updated README.md
- Refactored lyrics providers into their own files
- Improved romanizing logic
- CSS style minor changes

### Fixed

- Every possible ID now has singelong333 in order to not have conflicts with the og extension (in case you want to install both at the same time for some reason)
- Sometimes lyrics were fetched multiple times at the same time (usually when starting extension and when desync)

## [1.1.4] - 2025-08-18

### Changed

- Now empty verses (the ones with '♪ ♫ ♪') are centered

## [1.1.3] - 2025-08-18

### Changed

- Improved current verse animation
- Slightly reduced lyrics font size
- Fixed empty chorus displaying

## [1.1.2] - 2025-08-18

### Added

- Custom error 'No song is currently playing'

## [1.1.1] - 2025-08-18

### Added

- Webpack builder because I'm stupid

## [1.1.0] - 2025-08-18

### Added

- Local server closes after successful auth login
- Lyrics romanization (only for Japanese at the moment)
- LRCLIB lyrics provider
- Errors are now displayed using vscode notifications
- Lyrics animation for current verse

### Changed

- Extension rebrand to Singelong333
- Spotify API app (client_id and stuff like that)
- Slightly improved MusixMatch lyrics fetching
- Improved error logging in try catch blocks
- Lyrics rendering
- Chorus are now displayed in the right

### Removed

- Unnecessary indentations

### Fixed

- Spotify redirect_uri not valid

## [1.0.0] - 2024-09-14

- (Original SingeLong) Initial release
