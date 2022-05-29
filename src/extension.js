"use strict";
exports.__esModule = true;
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require("vscode");
var SidebarProvider_1 = require("./SidebarProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var sidebarProvider = new SidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("submit-for-jct-sidebar", sidebarProvider));
    var disposable = vscode.commands.registerCommand('submit-for-jct.evaluate', function () {
        vscode.window.showInformationMessage('Hello World from Submit For JCT!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
