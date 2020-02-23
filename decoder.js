var menuItem = chrome.contextMenus.create({
    contexts: ["selection"],
    title: "Copy",
    visible: false,
    onclick: () => alert("copy")
})

chrome.runtime.onMessage.addListener(
    request => chrome.contextMenus.update(menuItem, decode(request.selection)));

const writeToClipboard = content =>
    chrome.tabs.query({ active: true, currentWindow: true }, tabs =>
        tabs.length ? chrome.tabs.sendMessage(tabs[0].id, { content }) : {});

function decode(value) {
    try { return parse(atob(value)); }
    catch { return { visible: false } }
}

function parse(decoded) {
    try {
        var url = new URL(decoded);
        return { title: `Go to "${url}"`, onclick: () => chrome.tabs.update({ url: url.toString() }), visible: true };
    } catch {
        return { title: `Copy "${decoded}"`, onclick: () => writeToClipboard(decoded), visible: true };
    }
}
