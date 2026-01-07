# Deliverable 0: Installation Script

Run the following commands in your terminal to set up the environment and install dependencies.

```powershell
# 1. Initialize the project (if not already done)
# Note: Since the skeleton is being generated manually, you might just need to run install.

# 2. Install Tauri CLI (optional, if you want to use the CLI directly)
npm install -g @tauri-apps/cli@latest

# 3. Install Node Dependencies
# Core Svelte and Adapter
npm install svelte@next @sveltejs/kit @sveltejs/adapter-static vite

# Tailwind CSS and Skeleton UI
npm install tailwindcss postcss autoprefixer @skeletonlabs/tw-plugin

# Tauri API (for frontend)
npm install @tauri-apps/api @tauri-apps/plugin-shell

# 4. Install Rust Dependencies
# These are handled by cargo automatically when you run 'cargo tauri dev', 
# but you need the system dependencies for Tauri installed on your OS.
# See https://v2.tauri.app/start/prerequisites/
```
