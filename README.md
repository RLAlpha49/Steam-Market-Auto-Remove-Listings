# Steam Market Auto-Remove Listings Script

A userscript that helps you remove active market listings above a specified price threshold from your Steam Community Market.

## Requirements

- Modern web browser (Chrome, Firefox, Edge, etc.) with a userscript manager installed (e.g., Tampermonkey, Greasemonkey, Violentmonkey).
- Must be logged into your own Steam account.
- Navigate to your Steam Community Market page matching `https://steamcommunity.com/market/`.

## Installation

1. Install a userscript manager (Tampermonkey is recommended).
2. In Tampermonkey, click **Dashboard** → **+** (Add a new script).
3. Delete any default template code, then copy & paste the contents of `main.js` into the editor.
4. Save the script (File → Save or pressing **Ctrl+S**).
5. Reload or navigate to your Steam Market page; you should see the **Auto-Remove Listings** panel appear (top-right).

## Usage

1. Go to your Steam Community Market page (ensure you see your active listings).
2. Use the **Auto-Remove Listings** panel (top-right) and set the price threshold (e.g., 1.00 for $1.00).
3. Click **Start**.
4. The script will:
   - Navigate to the last page of your active listings.
   - Process listings from last to first page, removing those above the threshold.
   - Handle page navigation and removal dialogs automatically.
5. Monitor the browser console (`F12` → Console) for status logs and any errors.
6. Click **Stop** at any time to halt processing.
   - Optional: click **Pause** if you need it to temporarily stop between actions.
   - Optional: enable alerts on completion.

## Known Issues & Limitations

- Steam may have rate limits or UI changes that could affect functionality.
- The script only removes listings above the threshold; review before starting.
- Conflicts with other extensions may occur.
- Always review console logs to ensure correct operation.

## Disclaimer

Use this script at your own risk. The author is not responsible for any account issues resulting from its use.
