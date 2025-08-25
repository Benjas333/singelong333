# Change Log

All notable changes to the "singelong333" extension will be documented in this file.

<!-- Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file. -->

## [Unreleased]

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
- Refactored lyrics providers into its own files
- Improved romanizing logic
- CSS style minor changes

### Fixed

- Every possible ID now has singelong333 in order to not have conflicts with the og extension (in case you want to install both at the same time for some reason)
- Sometimes lyrics where fetched multiple times at the same time (usually when starting extension and when desync)

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

- Initial release
