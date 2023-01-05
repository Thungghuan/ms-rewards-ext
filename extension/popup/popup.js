const searchBtn = document.querySelector('.search-btn')
// const searchTime = +document.querySelector('.search-time').textContent

async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

searchBtn.addEventListener('click', async () => {
  const currentTab = await getCurrentTab()

  chrome.runtime.sendMessage({
    msg: 'ms-rewards-begin-search',
    searchTime,
    currentUrl: currentTab.url,
    tabId: currentTab.id
  })
})

let searchTime = (await chrome.storage.local.get(['searchTime'])).searchTime
if (!searchTime) {
  searchTime = 10
  await chrome.storage.local.set({ searchTime: 10 })
}

const addSearchTime = document.querySelector('.add')
const subSearchTime = document.querySelector('.sub')
document.querySelector('.search-time').textContent = searchTime

addSearchTime.addEventListener('click', async () => {
  searchTime++
  document.querySelector('.search-time').textContent = searchTime
  await chrome.storage.local.set({ searchTime })
})
subSearchTime.addEventListener('click', async () => {
  if (searchTime > 0) searchTime--
  document.querySelector('.search-time').textContent = searchTime
  await chrome.storage.local.set({ searchTime })
})
