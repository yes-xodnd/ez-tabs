chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: 'chrome://bookmarks',
    active: true,
  });
});