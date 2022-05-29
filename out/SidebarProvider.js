"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarProvider = void 0;
const vscode = require("vscode");
const WindowGenerator_1 = require("./WindowGenerator");
class SidebarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
        this.body = WindowGenerator_1.WindowGenerator.getCoursesBody();
    }
    resolveWebviewView(webviewView) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "onInfo": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case "onError": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
                case "onCourseSelection": {
                    if (!data.value) {
                        return;
                    }
                    this.body = WindowGenerator_1.WindowGenerator.getAssignmentsBody(data.value);
                    WindowGenerator_1.WindowGenerator.currentCourse = data.value;
                    WindowGenerator_1.WindowGenerator.currentAssignment = null;
                    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
                    break;
                }
                case "onAssignmentSelection": {
                    if (!data.value) {
                        return;
                    }
                    this.body = WindowGenerator_1.WindowGenerator.getAssignmentBody(data.value.assignment, data.value.course);
                    WindowGenerator_1.WindowGenerator.currentCourse = data.value.course;
                    WindowGenerator_1.WindowGenerator.currentAssignment = data.value.assignment;
                    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
                    break;
                }
                case "onBackToMain": {
                    this.body = WindowGenerator_1.WindowGenerator.getCoursesBody();
                    WindowGenerator_1.WindowGenerator.currentAssignment = null;
                    WindowGenerator_1.WindowGenerator.currentCourse = null;
                    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
                    break;
                }
            }
        });
    }
    revive(panel) {
        this._view = panel;
    }
    refresh() {
        this._view.webview.html = this._getHtmlForWebview(this._view.webview);
    }
    _getHtmlForWebview(webview) {
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.js"));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css"));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
        //${WindowGenerator.getAssignmentBody(get_assignments(get_courses()[3])[7])}
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">
			</head>
      <body>
      ${this.body}
      </body>
			</html>`;
    }
}
exports.SidebarProvider = SidebarProvider;
//# sourceMappingURL=SidebarProvider.js.map