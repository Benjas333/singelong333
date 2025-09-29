import * as vscode from 'vscode';
import axios from "axios";

import { Auth } from "../types/auth";
import { Playing } from "../types/playing";

const basic: string = 'MDU1NGFmOGEyMDJhNDI3ZGFiZjZhYWVmYjhiNzJkZWI6OWVkZDI1ZjZiNzExNDk2ODhkNzU2NzcyZTI1MWI2OTY=';
export const clientId: string = '0554af8a202a427dabf6aaefb8b72deb';
export const redirectUri: string = 'http://127.0.0.1:9878/callback';

const refreshToken = async (refresh_Token: string): Promise<Auth> => {
    try {
        const body = new URLSearchParams({
            'client_id': clientId,
            'redirect_uri': redirectUri,
            'grant_type': 'refresh_token',
            'refresh_token': refresh_Token
        });

        const response = await axios.post('https://accounts.spotify.com/api/token', body,
            {
                headers: { "Authorization": `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded", }
            }
        );

        const data = response.data;
        return { accessToken: data.access_token, refreshToken: data.refresh_token || refresh_Token, expiredIn: Date.now() + data.expires_in };
    }
    catch (e) {
        const message = `Refreshing token failed: ${e}`;
        if (/status code 5\d{2}/.test(message)) {
            vscode.window.showErrorMessage(`${message} Retrying in 5 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            return await refreshToken(refresh_Token);
        }
        vscode.window.showErrorMessage(message);
        return { exception: { code: 401, message } };
    }
};

const getToken = async (code: string): Promise<Auth> => {
    try {
        const body = new URLSearchParams({
            'client_id': clientId,
            'redirect_uri': redirectUri,
            'grant_type': 'authorization_code',
            'code': code
        });

        const response = await axios.post('https://accounts.spotify.com/api/token', body,
            {
                headers: { "Authorization": `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded", }
            }
        );

        const data = response.data;
        return { accessToken: data.access_token, refreshToken: data.refresh_token, expiredIn: Date.now() + data.expires_in };
    }
    catch (e) {
        const message = `Get access token failed: ${e}`;
        vscode.window.showErrorMessage(message);
        return { exception: { code: 401, message } };
    }
};

const getNowPlaying = async (token: string): Promise<Playing> => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player',
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        );

        const data = response.data;

        if (data.error) {return { exception: { code: data.error.status, message: data.error.message } };}
        if (!data.item) {return { exception: { code: 404, message: 'No song is currently playing' } };}
        if (data.item.artists.length === 0) {return { exception: { code: 404, message: 'Failed to fetch artist name' } };}
        return { id: data.item.id, artistName: data.item.artists[0].name, songTitle: data.item.name, currentProgress: data.progress_ms, albumName: data.item.album.name };
    } catch (e) {
        const message = `Get now playing failed: ${e}`;
        vscode.window.showErrorMessage(message);
        return { exception: { code: 404, message } };
    }
};

const getAuthorizationCode = (): void => {
    vscode.env.openExternal(vscode.Uri.parse(`https://accounts.spotify.com/en/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user-read-playback-state`));
};

export { refreshToken, getToken, getNowPlaying, getAuthorizationCode };