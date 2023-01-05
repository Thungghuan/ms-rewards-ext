function autoSearch(keyword) {
  const searchInput = document.querySelector('#sb_form_q')
  const searchSubmit = document.querySelector('#sb_form_go')

  searchInput.value = '' +  keyword
  searchSubmit.click()
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.msg === 'ms-rewards-search-once') {
    autoSearch(request.keyword)
  }
})

