function autoSearch(keyword) {
  const searchInput = document.querySelector('#sb_form_q')
  const searchSubmit = document.querySelector('#sb_form_go')

  searchInput.value = '' + keyword
  searchSubmit.click()
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.msg === 'ms-rewards-search-once') {
    autoSearch(request.keyword)
  }
})

async function newtabBeginSearch() {
  if (location.search.split(/[?&=]/).includes('ms_rewards_newtab')) {
    chrome.runtime.sendMessage({
      msg: 'ms-rewards-begin-search',
      currentUrl: location.href,
      searchTime: (await chrome.storage.local.get(['searchTime'])).searchTime
    })
  }
}

newtabBeginSearch()
