// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { gradeAssignment } from './Interface/typescript-interface';
import { WindowGenerator } from './WindowGenerator';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
  	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"submit-for-jct-sidebar",
		sidebarProvider
		)
  	);
	let disposable = vscode.commands.registerCommand('submit-for-jct.evaluate', (uri:vscode.Uri) => {
		let uriStr = decodeURI(uri.toString()).split("").slice(7).join("");
		if (!WindowGenerator.currentCourse || !WindowGenerator.currentAssignment) {
			vscode.window.showInformationMessage("Please select a course and assignment first.");
		}else{
			var evaluation = gradeAssignment(WindowGenerator.currentCourse,WindowGenerator.currentAssignment,uriStr);
			vscode.window.showInformationMessage(`Grade: ${evaluation.grade}`);
			sidebarProvider.body = WindowGenerator.getAssignmentBody(WindowGenerator.currentAssignment, WindowGenerator.currentCourse, evaluation.grade, evaluation.evaluation);
			sidebarProvider.refresh();
			
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
