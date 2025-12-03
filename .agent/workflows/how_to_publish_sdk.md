---
description: How to publish the SDK to npm
---

This workflow describes the manual process for publishing the `@openmonetize/sdk` package to npm.

**Note:** This project uses `pnpm` workspaces. Due to some compatibility issues with version commands, **manual version bumping is recommended**.

1.  **Navigate to the SDK directory:**
    ```bash
    cd platform/packages/sdk
    ```

2.  **Ensure you are logged in to npm:**
    ```bash
    npm login
    ```

3.  **Bump the version (Manual):**
    Open `package.json` and manually update the `version` field.
    
    ```json
    // Change this line
    "version": "0.0.2",
    ```

    *Note: The `pnpm version` command may fail due to workspace protocol issues, so manual editing is safer.*

4.  **Build the SDK:**
    Ensure the latest code is built.
    ```bash
    pnpm run build
    ```

5.  **Publish to npm:**
    ```bash
    pnpm publish --access public --no-git-checks
    ```
