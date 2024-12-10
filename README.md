# Next.js Theme Switcher

## Overview

Next.js Theme Switcher is a VSCode extension that automatically changes your editor's color theme based on the type of file you're editing in a Next.js project.

## Features

- Automatically detects Next.js file types:
  - Client-side files
  - Server-side files
  - Isomorphic/shared files
- Configurable themes for each file type
- Works only in Next.js projects (detected by presence of `next.config.js`)

## Configuration

You can configure the themes in your VSCode settings:

```json
{
  "nextjsThemeSwitcher.clientTheme": "Default Dark+",
  "nextjsThemeSwitcher.serverTheme": "Default Light+",
  "nextjsThemeSwitcher.isomorphicTheme": "Monokai"
}
```

## How It Works

The extension uses several heuristics to detect file types:
- Filename patterns
- `use client` and `use server` directives
- Presence of React hooks and browser APIs
- Next.js specific file locations

### File Type Detection

- **Client-side**: Files with `.client.tsx`, in `components/` or `hooks/` directories
- **Server-side**: Files with `.server.tsx`, in `api/` or `server/` directories
- **Isomorphic**: Files with both client and server-side code

## Installation

1. Open VSCode
2. Go to Extensions
3. Search for "Next.js Theme Switcher"
4. Click Install

## Requirements

- VSCode 1.85.0 or higher
- Next.js project

## Limitations

- Theme switching depends on accurate file type detection
- May not work perfectly with all project structures

## Feedback

Please report issues or suggestions on the GitHub repository.

## License

[Your License Here]
