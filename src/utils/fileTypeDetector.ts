import * as vscode from 'vscode';
import * as path from 'path';

export enum FileType {
  CLIENT,
  SERVER,
  ISOMORPHIC
}

export function detectNextJsFileType(document: vscode.TextDocument): FileType {
  const fileName = path.basename(document.fileName);
  const fileExt = path.extname(fileName);
  const filePath = document.fileName;

  // Check for Next.js specific client-side indicators
  const clientSidePatterns = [
    /\.(client|page)\.tsx?$/,
    /\/hooks\//,
    /\/context\//,
    /\/components\//
  ];

  // Check for Next.js specific server-side indicators
  const serverSidePatterns = [
    /\.(server)\.tsx?$/,
    /\/api\//,
    /\/pages\/api\//,
    /\/lib\//,
    /\/server\//,
    /routes\.tsx?$/
  ];

  // Check if the file contains React hooks or client-side directives
  const fileContent = document.getText();
  const usesClientDirective = fileContent.includes('use client');
  const usesServerDirective = fileContent.includes('use server');

  // Check patterns and directives to determine file type
  if (usesClientDirective) {
    return FileType.CLIENT;
  }

  if (usesServerDirective) {
    return FileType.SERVER;
  }

  // Check filename patterns
  if (clientSidePatterns.some(pattern => pattern.test(filePath))) {
    return FileType.CLIENT;
  }

  if (serverSidePatterns.some(pattern => pattern.test(filePath))) {
    return FileType.SERVER;
  }

  // Check file content for hooks or browser APIs that indicate client-side code
  const clientSideIndicators = [
    'useState',
    'useEffect',
    'useContext',
    'window.',
    'document.',
    'navigator.'
  ];

  const serverSideIndicators = [
    'getServerSideProps',
    'getStaticProps',
    'getStaticPaths',
    'import { sql }',
    'serverless'
  ];

  const hasClientSideCode = clientSideIndicators.some(indicator =>
    fileContent.includes(indicator)
  );

  const hasServerSideCode = serverSideIndicators.some(indicator =>
    fileContent.includes(indicator)
  );

  if (hasClientSideCode && hasServerSideCode) {
    return FileType.ISOMORPHIC;
  }

  if (hasClientSideCode) {
    return FileType.CLIENT;
  }

  if (hasServerSideCode) {
    return FileType.SERVER;
  }

  // Default to isomorphic if no clear indication
  return FileType.ISOMORPHIC;
}
