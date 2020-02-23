var copyMenu = chrome.contextMenus.create({
    contexts: ["selection"],
    title: "Copy",
    visible: false,
    onclick: () => alert("copy")
})

chrome.runtime.onMessage.addListener(
    function (request) {
        const parsed = parse(request.selection);
        chrome.contextMenus.update(copyMenu, parsed)
    }
);

function parse(value) {
    const decoded = tryDecode(value);
    if (decoded === null) return { visible: false };

    try {
        var url = new URL(decoded);
        return { title: `Go to ${url}`, onclick: () => chrome.tabs.update({ url: url.toString() }), visible: true };
    } catch {
        return { title: `Copy ${decoded}`, onclick: () => navigator.clipboard.writeText(decoded), visible: true };
    }
}

function tryDecode(selection) {
    try {
        return atob(selection)
    }
    catch {
        return null;
    }
}

