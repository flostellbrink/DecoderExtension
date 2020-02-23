document.onselectionchange = () =>
    chrome.runtime.sendMessage(
        { selection: document.getSelection().toString() })
