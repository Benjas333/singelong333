import * as vscode from 'vscode';
import fs from 'node:fs';
import express, { Request, Response } from "express";
import { SingeLongViewProvider } from './panel/panel';
import * as spotify from './utils/spotify';
import * as lyric from './utils/lyric';
import { Auth } from './types/auth';
import { Lyric } from './types/lyric';

let extensionContext: vscode.ExtensionContext;
let provider: SingeLongViewProvider;
let extensionUri: vscode.Uri;
let alreadyFetchingLyrics = false;

export function activate(context: vscode.ExtensionContext) {
	// making private context accessed globally;
	extensionContext = context;
	provider = new SingeLongViewProvider(context.extensionUri);
	extensionUri = context.extensionUri;

	// define authorize command in vscode
	const login = vscode.commands.registerCommand('singelong333.authorize', () => authorize());
	context.subscriptions.push(login);

	// define logout command in vscode
	const logout = vscode.commands.registerCommand('singelong333.logout', () => signOut());
	context.subscriptions.push(logout);

	// creating panel
	const panelProvider = vscode.window.registerWebviewViewProvider(SingeLongViewProvider.viewType, provider);
	context.subscriptions.push(panelProvider);

	const reload = vscode.commands.registerCommand('singelong333.reload-panel', () => reloadPanel());
	context.subscriptions.push(reload);

	// listen updates
	setInterval(listener, 1000);
}

const authorize = async () => {
	// start local webserver callback
	const app = express();

	app.get("/callback", async (req: Request, res: Response) => {
		const contentUri = vscode.Uri.joinPath(extensionUri, "assets", "close.html");
		const content = fs.readFileSync(contentUri.fsPath, 'utf-8');
		const code = req.query.code;

		extensionContext.globalState.update("code", code);
		await requestAccessToken();

		vscode.window.showInformationMessage('SingeLong333: Spotify authorized successfully');
		res.send(content);
		server.close();
	});

	const server = app.listen(9878);

	// open url to retrive spotify authorization code
	spotify.getAuthorizationCode();
};

const signOut = async () => extensionContext.globalState.update("auth", null);

const reloadPanel = () => {
	provider.reloadContent();
	setTimeout(() => extensionContext.globalState.update('lyric', null), 2500);
};

const requestAccessToken = async (): Promise<Auth> => {
	const timestamp = Date.now();
	const auth = extensionContext.globalState.get<Auth>("auth");
	const code = extensionContext.globalState.get<string>("code");

	const expiredIn = auth?.expiredIn || 0;
	const refreshToken = auth?.refreshToken;
	const isTokenExpired = (timestamp >= expiredIn) && refreshToken != null;
	const isTokenExist = (auth?.accessToken != null);

	if (isTokenExpired) {
		const data = await spotify.refreshToken(refreshToken);
		if (data.exception) {provider.view?.webview.postMessage({ 'command': 'error', 'message': data.exception.message });}
		extensionContext.globalState.update("auth", data);
		return data;
	}

	if (!isTokenExist) {
		const data = await spotify.getToken(code || '');
		if (data.exception) {provider.view?.webview.postMessage({ 'command': 'error', 'message': data.exception.message });}
		extensionContext.globalState.update("auth", data);
		return data;
	}

	extensionContext.globalState.update("auth", auth);
	return auth;
};

const listener = async () => {
	let auth = extensionContext.globalState.get<Auth>('auth');
	const isTokenExist = (auth?.accessToken != null);

	if (!isTokenExist) {
		provider.view?.webview.postMessage({ 'command': 'error', 'message': 'Spotify account isn\'t authorized yet' });
		return;
	}

	auth = await requestAccessToken();
	let lyricData: Lyric;
	const lyricCoolDown = extensionContext.globalState.get<number>('cooldown') || 0;
	let lyricState = extensionContext.globalState.get<Lyric>('lyric');
	const playing = await spotify.getNowPlaying(auth.accessToken!);
	const timestamp = Date.now();

	if (playing.exception) {
		return provider.view?.webview.postMessage({ 'command': 'error', 'message': playing.exception.message });
	}

	provider.view?.webview.postMessage({
		'command': 'updateProgress',
		'content': playing.currentProgress
	});

	const retrieveLyrics = (
		lyricState?.id !== playing.id
		|| (
			lyricState?.exception
			&& timestamp >= lyricCoolDown
		)
	);

	if (!alreadyFetchingLyrics && (!lyricState || retrieveLyrics)) {
		alreadyFetchingLyrics = true;
		console.log(`Retrieving lyrics for: ${playing.songTitle} (${playing.artistName})`);
		extensionContext.globalState.update('cooldown', Date.now() + 30000);
		lyricData = await lyric.getLyric(playing);
		
		extensionContext.globalState.update('lyric', lyricData);
		lyricState = lyricData;
		
		provider.view?.webview.postMessage({
			'command': 'updateLyrics',
			'content': lyricState
		});
		alreadyFetchingLyrics = false;
	}
	
	if (lyricState?.exception) {
		return provider.view?.webview.postMessage({ 'command': 'error', 'message': lyricState.exception.message });
	}
	
	// provider.view?.webview.postMessage({
	// 	'command': 'updatePlayer',
	// 	'content': {
	// 		'lyrics': lyricState?.syncedLyric,
	// 		'milliseconds': playing.currentProgress
	// 	}
	// })
};

export function deactivate() { }
