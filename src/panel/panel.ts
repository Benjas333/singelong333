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

    get indexContentUri() {
        return vscode.Uri.joinPath(this._extensionUri, 'assets', 'index.html');
    }

    public reloadContent() {
        if (!this.view) return;
        const contentUri = this.view.webview.asWebviewUri(this.indexContentUri);
        this.view.webview.html = this.getHtmlContent(contentUri)
    }

    private getHtmlContent(contentUri: vscode.Uri): string {
        const content = fs.readFileSync(contentUri.fsPath, 'utf-8');
        return content;
    }
}