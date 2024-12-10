import * as vscode from 'vscode';
import { detectNextJsFileType, FileType } from './utils/fileTypeDetector';

export function activate(context: vscode.ExtensionContext) {
  // Check if we're in a Next.js project by looking for next.config.js
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    return;
  }

  const isNextJsProject = workspaceFolders.some(folder => {
    const nextConfigPath = vscode.Uri.joinPath(folder.uri, 'next.config.js');
    return vscode.workspace.fs.stat(nextConfigPath).then(
      () => true,
      () => false
    );
  });

  if (!isNextJsProject) {
    return;
  }

  // Get theme configurations from settings
  const config = vscode.workspace.getConfiguration('nextjsThemeSwitcher');
  const clientTheme = config.get<string>('clientTheme', 'Default Dark+');
  const serverTheme = config.get<string>('serverTheme', 'Default Light+');
  const isomorphicTheme = config.get<string>('isomorphicTheme', 'Monokai');

  // Theme switching function
  const switchTheme = (fileType: FileType) => {
    switch (fileType) {
      case FileType.CLIENT:
        vscode.commands.executeCommand('workbench.action.selectTheme', clientTheme);
        break;
      case FileType.SERVER:
        vscode.commands.executeCommand('workbench.action.selectTheme', serverTheme);
        break;
      case FileType.ISOMORPHIC:
        vscode.commands.executeCommand('workbench.action.selectTheme', isomorphicTheme);
        break;
    }
  };

  // Active text editor theme switch
  const switchActiveEditorTheme = () => {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      const fileType = detectNextJsFileType(activeEditor.document);
      switchTheme(fileType);
    }
  };

  // Register event listeners
  context.subscriptions.push(
    // Switch theme when changing active editor
    vscode.window.onDidChangeActiveTextEditor(() => {
      switchActiveEditorTheme();
    }),

    // Switch theme when document content changes
    vscode.workspace.onDidChangeTextDocument((event) => {
      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor && event.document === activeEditor.document) {
        switchActiveEditorTheme();
      }
    })
  );

  // Initial theme switch for the current active editor
  switchActiveEditorTheme();
}

export function deactivate() {
  // Clean up if needed
}
