document.onselectionchange = () =>
    chrome.runtime.sendMessage(
        { selection: document.getSelection().toString() })

chrome.runtime.onMessage.addListener(
    request => navigator.clipboard.writeText(request.content));
