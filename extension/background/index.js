function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getRandom() {
  return Math.floor(Math.random() * 99) + 1
}

if (true) {
  chrome.action.setIcon({ path: '../assets/huan128.png' })
} else {
  chrome.action.setIcon({ path: '../assets/huan_badge.png' })
}

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.msg === 'ms-rewards-begin-search') {
    if (
      /^https?:\/\/(?:[^./?#]+\.)?bing\.com\/search/.test(request.currentUrl)
    ) {
      for (let i = 0; i < request.searchTime; ++i) {
        chrome.tabs.sendMessage(request.tabId, {
          msg: 'ms-rewards-search-once',
          keyword: getRandom()
        })
        await sleep(2000)
      }
    } else {
      const keyword = 1
      const url = `https://www.bing.com/search?q=${keyword}&ms_rewards=true`
      const tab = await chrome.tabs.create({ url })
    }
  } else {
    console.log(request)
  }
})
