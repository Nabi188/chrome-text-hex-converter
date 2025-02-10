chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "convertHex",
        title: "Convert Hex to Text",
        contexts: ["selection"]
    });
    
    chrome.contextMenus.create({
        id: "convertText",
        title: "Convert Text to Hex",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "convertHex") {
        const hexString = info.selectionText;
        chrome.storage.local.set({ result: hexString, inputType: 'hex' });
        chrome.action.openPopup(); // Mở popup
    } else if (info.menuItemId === "convertText") {
        const textString = info.selectionText;
        chrome.storage.local.set({ result: textString, inputType: 'text' });
        chrome.action.openPopup(); // Mở popup
    }
});

function hexToText(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

function textToHex(text) {
    let hex = '';
    for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16);
    }
    return hex;
} 