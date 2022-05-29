"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const SidebarProvider_1 = require("./SidebarProvider");
const typescript_interface_1 = require("./Interface/typescript-interface");
const WindowGenerator_1 = require("./WindowGenerator");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const sidebarProvider = new SidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("submit-for-jct-sidebar", sidebarProvider));
    let disposable = vscode.commands.registerCommand('submit-for-jct.evaluate', (uri) => {
        let uriStr = decodeURI(uri.toString()).split("").slice(7).join("");
        if (!WindowGenerator_1.WindowGenerator.currentCourse || !WindowGenerator_1.WindowGenerator.currentAssignment) {
            vscode.window.showInformationMessage("Please select a course and assignment first.");
        }
        else {
            var evaluation = (0, typescript_interface_1.gradeAssignment)(WindowGenerator_1.WindowGenerator.currentCourse, WindowGenerator_1.WindowGenerator.currentAssignment, uriStr);
            vscode.window.showInformationMessage(`Grade: ${evaluation.grade}`);
            sidebarProvider.body = WindowGenerator_1.WindowGenerator.getAssignmentBody(WindowGenerator_1.WindowGenerator.currentAssignment, WindowGenerator_1.WindowGenerator.currentCourse, evaluation.grade, evaluation.evaluation);
            sidebarProvider.refresh();
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map