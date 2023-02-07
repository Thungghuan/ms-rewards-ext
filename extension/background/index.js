function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getRandom() {
  return Math.floor(Math.random() * 99) + 1
}

async function setBadge() {
  const today = new Date()
  const storage = await chrome.storage.local.get(['lastFinishDate'])

  let lastFinishDate = storage.lastFinishDate

  let first = false
  if (lastFinishDate === undefined) {
    lastFinishDate = today.toLocaleDateString()
    first = true
  }

  if (first || today.toLocaleDateString() !== lastFinishDate) {
    chrome.action.setIcon({ path: '../assets/rewards_badge.png' })
  } else {
    chrome.action.setIcon({ path: '../assets/rewards128.png' })
  }
}

setBadge()

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.msg === 'ms-rewards-begin-search') {
    const today = new Date()
    await chrome.storage.local.set({
      lastFinishDate: today.toLocaleDateString()
    })

    await setBadge()

    const queryOptions = { active: true }
    const [tab] = await chrome.tabs.query(queryOptions)
    const tabId = tab.id

    if (
      /^https?:\/\/(?:[^./?#]+\.)?bing\.com\/search/.test(request.currentUrl)
    ) {
      for (let i = 0; i < request.searchTime; ++i) {
        chrome.tabs.sendMessage(tabId, {
          msg: 'ms-rewards-search-once',
          keyword: getRandom()
        })
        await sleep(2000)
      }
    } else {
      const keyword = 1
      const url = `https://www.bing.com/search?q=${keyword}&ms_rewards_newtab=true`
      const tab = await chrome.tabs.create({ url })
    }
  } else {
    console.log(request)
  }
})

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.clear()
})
