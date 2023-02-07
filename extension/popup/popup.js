const searchBtn = document.querySelector('.search-btn')

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
    currentUrl: currentTab.url
  })
})

let searchTime = (await chrome.storage.local.get(['searchTime'])).searchTime
if (!searchTime) {
  searchTime = 10
  await chrome.storage.local.set({ searchTime: 10 })
}

const addSearchTime = document.querySelector('.add')
const subSearchTime = document.querySelector('.sub')
const searchTimeInput = document.querySelector('.search-time')
searchTimeInput.value = searchTime

addSearchTime.addEventListener('click', async () => {
  searchTime++
  searchTimeInput.value = searchTime
  await chrome.storage.local.set({ searchTime })
})
subSearchTime.addEventListener('click', async () => {
  if (searchTime > 0) searchTime--
  searchTimeInput.value = searchTime
  await chrome.storage.local.set({ searchTime })
})
searchTimeInput.addEventListener('change', async (e) => {
  searchTime = e.target.value
  await chrome.storage.local.set({ searchTime })
})

const dashboardBtn = document.querySelector('.dashboard-btn')
dashboardBtn.addEventListener('click', async () => {
  const url = `https://rewards.bing.com/`
  await chrome.tabs.create({ url })
})
