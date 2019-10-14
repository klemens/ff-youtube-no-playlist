"use strict";

const MENU_ID = "youtube-no-playlist@klemens.io"

browser.menus.create({
    id: MENU_ID,
    title: "Play video without playlist",
    targetUrlPatterns: [
         "*://www.youtube.com/watch*?*list=*",
    ],
    contexts: [
        "link"
    ],
});

// Copy the link text to the clipboard when the menu entry is clicked
browser.menus.onClicked.addListener((info, tab) => {
    if(info.linkUrl) {
        let newTabProperties = {};

        // Remove list and index query parameters from url
        let url = new URL(info.linkUrl);
        let query = new URLSearchParams(url.search);
        query.delete("list");
        query.delete("index");
        url.search = query.toString();
        newTabProperties.url = url.href;

        // Provide openerTabId if possible (e.g. for tree style tabs)
        if(tab) {
            newTabProperties.openerTabId = tab.id;
        }

        browser.tabs.create(newTabProperties);
    }
});
