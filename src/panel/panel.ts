import * as vscode from 'vscode';
import fs from 'node:fs';

export class SingeLongViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = "singelong333.openview";
    public view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) { }

    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext<unknown>, token: vscode.CancellationToken): void | Thenable<void> {
        this.view = webviewView;

        this.view.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };

        this.reloadContent();
    }

    private getPanelUri(file: string) {
        return vscode.Uri.joinPath(this._extensionUri, 'assets', 'panel', file);
    }

    get indexContentUri() {
        return this.getPanelUri('index.html');
    }

    get stylesheet() {
        return this.getPanelUri('index.css');
    }

    get particles() {
        return this.getPanelUri('particles.js');
    }

    public reloadContent() {
        if (!this.view) {return;}
        const contentUri = this.view.webview.asWebviewUri(this.indexContentUri);
        let content = this.getHtmlContent(contentUri);

        const stylesheetUri = this.view.webview.asWebviewUri(this.stylesheet);
        const particlesUri = this.view.webview.asWebviewUri(this.particles);
        content = content.replace('{{STYLE_URI}}', `${stylesheetUri}`).replace('{{PARTICLES_URI}}', `${particlesUri}`);

        this.view.webview.html = content;
    }

    private getHtmlContent(contentUri: vscode.Uri): string {
        const content = fs.readFileSync(contentUri.fsPath, 'utf-8');
        return content;
    }
}