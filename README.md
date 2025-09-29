<div align="center">
    <img src="./assets/images/icon.png" width="128"  style="display: block; margin: 0 auto"/>
    <h1>SingeLong333</h1>
    <p>VSCode extension to singelong (read: sing along) played music connected with your spotify</p>
</div>

---
***This is a reimagination of the original [SingeLong](https://github.com/qolbudr/singelong) extension. To know the differences, please refer to the [changelog](./CHANGELOG.md) or [features](#features)***
<p align="center">
  <img src="./assets/demo.gif" width="100%" />
</p>

## Features
- Lyrics romanization for Japanese, Chinese, Korean, and Thai
- LRCLIB lyrics provider
- Lyrics animation
- Plain lyrics in case synced lyrics are not available
- Refresh/refetch lyrics button

## Features (Legacy SingeLong)
- Autosync lyric for (almost) any song
- Spotify account synchronize
- MusixMatch lyrics provider
- Dynamic background **(coming soon)**

## Installation

[<img src="https://raw.githubusercontent.com/NeoApplications/Neo-Backup/034b226cea5c1b30eb4f6a6f313e4dadcbb0ece4/badge_github.png"
    alt="Get it on GitHub"
    height="80">](https://github.com/Benjas333/singelong333/releases/latest)

## Acknowledgments
### Platforms
- [**Spotify**](https://www.spotify.com/): A digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world.

### Lyrics providers
- [**MusixMatch**](https://www.musixmatch.com/): The World's Largest Lyrics Catalog.
- [**YT Music**](https://music.youtube.com/): Watch and listen to a nearly endless catalog in an app designed for music discovery. **(coming soon)**
- [**LRCLIB**](https://lrclib.net/): Open-source, community-driven service for retrieving and contributing music lyrics.
- [**Xinqiao Wang**](https://music.xianqiao.wang/): Xinqiao Wang Music Player.
- [**Genius**](https://genius.com/): The world’s biggest collection of song lyrics and musical knowledge. *(Does not provide synced lyrics)* **(coming soon)**


## TODO (in priority order)
- Redo from zero the entire lyrics panel html, because its og code is horrendous (50%).
  - Redo the subtitles system (can't handle more than one subtitle).
- Retrieving official romanization lyrics from MusixMatch.
- Add YTMusic lyrics provider (waiting for [PR merge](https://github.com/zS1L3NT/ts-npm-ytmusic-api/pull/55)).
- Add Genius lyrics provider.
- More precise lyrics wave animation (timing).
### v2.0
- Add Windows Media Control support.
- Add dynamic background because the original repo promised it.


## Disclaimer
This project and its contents are not affiliated with, funded, authorized, endorsed by, or in any way associated with Spotify or any of its affiliates and subsidiaries.

\*For educational purpose only