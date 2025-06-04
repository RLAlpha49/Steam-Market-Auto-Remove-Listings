# Steam Market Auto-Remove Listings Userscript

## Overview

This userscript adds a button to the Steam Community Market page, allowing you to automatically remove all your active market listings above a user-specified price. It works from the last to the first page of your listings, making bulk removal of expensive listings quick and easy.

## Features

- Adds a custom button to the Steam Market UI.
- Lets you specify a minimum price threshold (e.g., remove all listings above $1.00).
- Automatically navigates through all your active listings, removing those above the threshold.
- Works from the last to the first page for efficiency.
- Simple, non-intrusive UI.

## How It Works

1. The script injects a green button labeled `Remove Listings > $` with an input field for your price threshold.
2. Enter your desired minimum price (e.g., `1.00` for $1.00) and click the button.
3. The script will automatically go to the last page of your listings and start removing all listings above the specified price, page by page, until it reaches the first page.
4. When finished, you'll see an alert indicating completion.

## Installation

1. **Install a userscript manager:**
   - [Tampermonkey](https://www.tampermonkey.net/) (recommended)
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [Greasemonkey](https://www.greasespot.net/)
2. **Install the script:**
   - [Click here to install from GitHub](https://raw.githubusercontent.com/RLAlpha49/steam-market-auto-remove-listings/main/main.js) (or copy the contents of `main.js` into a new userscript in your manager)
3. **Go to the [Steam Community Market](https://steamcommunity.com/market/)**
4. **Use the new button** at the top of your active listings tab.

## Usage

- Enter the price threshold in the input field next to the `Remove Listings > $` button.
- Click the button to start the removal process.
- The script will process all pages, removing listings above your specified price.
- You will be notified when the process is complete.

## Notes

- The script only works on the Steam Community Market page (`https://steamcommunity.com/market/`).
- Minimum price allowed is $0.03 (Steam's minimum listing price).
- The script is non-destructive and only removes listings above your chosen threshold.
- You can stop the process at any time by refreshing the page.

## Disclaimer

This script is provided as-is, with no warranty. Use at your own risk. It is not affiliated with or endorsed by Valve or Steam.

## License

MIT

## Author

[RLAlpha49](https://github.com/RLAlpha49)
