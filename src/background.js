global.browser = require('webextension-polyfill')

var redurl, enabled

chrome.storage.local.get('img', function(url) {
  redurl =
    url.hasOwnProperty('img') && url.img.hasOwnProperty('length')
      ? url.img[0]
      : 'https://i.imgur.com/8AoVUG0.png'
  enabled = url.hasOwnProperty('img') && url.img.hasOwnProperty('length') ? url.img[1] : false
  var requestsToRedirect = new Object()

  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      if (/\/images\/paint_board\//.test(details.url) && enabled) {
        requestsToRedirect[details.requestId] = 1
      }
    },
    { urls: ['<all_urls>'] },
    ['blocking', 'requestHeaders']
  )

  chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
      if (requestsToRedirect[details.requestId]) {
        delete requestsToRedirect[details.requestId]
        return { redirectUrl: 'https://api.yoworld.info/extension.php?x=' + redurl }
      }
    },
    { urls: ['<all_urls>'] },
    ['blocking']
  )

  chrome.webRequest.onErrorOccurred.addListener(
    function(details) {
      delete requestsToRedirect[details.requestId]
    },
    { urls: ['<all_urls>'] }
  )
})

chrome.storage.onChanged.addListener(function(changes, namespace) {
  chrome.storage.local.get('img', function(url) {
    redurl =
      url.hasOwnProperty('img') && url.img.hasOwnProperty('length')
        ? url.img[0]
        : 'https://i.imgur.com/8AoVUG0.png'
    enabled = url.hasOwnProperty('img') && url.img.hasOwnProperty('length') ? url.img[1] : false
  })
})
