// ==UserScript==
// @name         Steam Market Auto-Remove Listings
// @description  Adds a button to remove market listings above a user-specified price from last to first page.
// @version      1.0.0
// @author       RLAlpha49
// @namespace    https://github.com/RLAlpha49/Steam-Market-Auto-Remove-Listings-Script
// @license      MIT
// @match        https://steamcommunity.com/market/
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Utility function to create a delay (used for waiting on UI updates)
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Waits for the remove listing dialog to close before continuing
  async function waitForDialogToClose() {
    const dialog = document.getElementById("market_removelisting_dialog");
    let retries = 20;
    while (dialog && getComputedStyle(dialog).display !== "none" && retries-- > 0) {
      await delay(200);
    }
  }

  // Processes all listings on the current page, removing those above the minPrice
  async function processListingsOnPage(minPrice) {
    const container = document.getElementById("tabContentsMyActiveMarketListingsRows");
    if (!container) return;

    // Get all listing divs
    const listingDivs = Array.from(container.querySelectorAll("div[id^='mylisting_']"));
    // Filter listings above the specified price
    const targetListings = listingDivs.filter(div => {
      const priceSpan = div.querySelector("span[title='This is the price the buyer pays.']");
      if (priceSpan && priceSpan.textContent) {
        const price = parseFloat(priceSpan.textContent.replace("$", ""));
        return price > minPrice;
      }
      return false;
    });

    // Remove each target listing
    for (const div of targetListings) {
      // Find the edit button for the listing
      const editButton = div.querySelector("a.item_market_action_button.item_market_action_button_edit.nodisable");
      if (!editButton) continue;

      editButton.click(); // Open the remove dialog
      await delay(500); // Wait for dialog to appear

      let acceptButton;
      let retries = 10;
      // Wait for the accept button to become available
      while (retries-- > 0) {
        acceptButton = document.querySelector("#market_removelisting_dialog_accept");
        if (acceptButton && acceptButton.offsetParent !== null) break;
        await delay(200);
      }

      // Click the accept button to confirm removal
      if (acceptButton && acceptButton.offsetParent !== null) {
        acceptButton.click();
        await waitForDialogToClose(); // Wait for dialog to close before continuing
      }
    }
  }

  // Clicks a button (by ID) repeatedly until it becomes disabled (used for pagination)
  async function clickButtonUntilDisabled(buttonId) {
    const button = document.getElementById(buttonId);
    while (button && !button.classList.contains("disabled")) {
      button.click();
      await delay(2000); // Wait for page to update
    }
  }

  // Clicks a button (by ID) if enabled, returns true if clicked
  async function clickIfEnabled(buttonId) {
    const button = document.getElementById(buttonId);
    if (button && !button.classList.contains("disabled")) {
      button.click();
      await delay(2000); // Wait for page to update
      return true;
    }
    return false;
  }

  // Main script logic: navigates to last page, removes listings, and paginates backward
  async function runScript(minPrice) {
    const nextButtonId = "tabContentsMyActiveMarketListings_btn_next";
    const prevButtonId = "tabContentsMyActiveMarketListings_btn_prev";

    // Go to the last page of listings
    await clickButtonUntilDisabled(nextButtonId);

    // Process each page from last to first
    do {
      await processListingsOnPage(minPrice);
    } while (await clickIfEnabled(prevButtonId));

    alert("Finished processing all listings above $" + minPrice.toFixed(2));
  }

  // Inserts the custom button and input field into the Steam Market UI
  function insertStyledButton() {
    const sellBtnWrapper = document.querySelector("#myMarketTabs .pick_and_sell_button");
    if (!sellBtnWrapper) return;

    // Create new styled button wrapper
    const customBtnWrapper = document.createElement("div");
    customBtnWrapper.className = "pick_and_sell_button";
    customBtnWrapper.style.marginRight = "15%";

    // Create green action button
    const customBtn = document.createElement("a");
    customBtn.href = "javascript:void(0)";
    customBtn.className = "item_market_action_button item_market_action_button_green";
    customBtn.style.verticalAlign = "middle";

    // Button label
    const spanContainer = document.createElement("span");
    spanContainer.className = "item_market_action_button_contents";
    spanContainer.textContent = "Remove Listings > $";

    // Input field for price threshold
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0.03";
    input.step = "0.01";
    input.value = "0.03";
    input.style.width = "50px";
    input.style.marginLeft = "4px";
    input.style.height = "20px";
    input.style.verticalAlign = "middle";

    // Compose button UI
    customBtn.appendChild(spanContainer);
    customBtnWrapper.appendChild(customBtn);
    customBtnWrapper.appendChild(input);
    sellBtnWrapper.parentElement.insertBefore(customBtnWrapper, sellBtnWrapper);

    // Button click handler: starts the removal process
    customBtn.onclick = () => {
      const price = parseFloat(input.value);
      if (isNaN(price) || price <= 0) {
        alert("Please enter a valid price greater than $0.00");
        return;
      }
      runScript(price);
    };
  }

  // Wait for the Steam Market UI to load, then insert the custom button
  const interval = setInterval(() => {
    if (document.querySelector("#myMarketTabs .pick_and_sell_button")) {
      clearInterval(interval);
      insertStyledButton();
    }
  }, 500);
})();
