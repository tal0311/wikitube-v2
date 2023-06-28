'use strict'
const YT_API_KEY = 'AIzaSyCQ3VQLxhDknZgctC7gsaB2tpWsMuYSN8A'
var gSearchTerm = 'vue'
var gCache = loadFromStorage('cache') || {}



function getAllData() {
  if (gCache[gSearchTerm]) {
    console.log('from cache')
    return Promise.resolve(gCache[gSearchTerm])
  }

  const YT_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=${gSearchTerm}&maxResults=10`
  const WIKI_URL = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${gSearchTerm}&format=json`
  // same as: axios.all([axios.get(YT_URL), axios.get(WIKI_URL)])
  return Promise.all([axios.get(YT_URL), axios.get(WIKI_URL)]).then((res) => {
    const [res1, res2] = res
    const videos = prepData(res1.data)
    const wikiData = prepWikiData(res2.data)
    gCache[gSearchTerm] = { videos, wikiData }
    saveToStorage('cache', gCache)
    return { videos, wikiData }
  }).catch((err) => {
    throw err
  })

}

function prepWikiData({ query: { search: items } }) {
  return items.map((item) => {
    return {
      id: item.pageid,
      title: item.title,
      desc: item.snippet,

    }
  })
}
function prepData({ items }) {

  return items.map((item) => {

    return {
      id: item.id.videoId,
      title: item.snippet.title,
      cover: item.snippet.thumbnails.high.url,
      desc: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      channel: item.snippet.channelTitle,
    }
  })
}

function setSearchTerm(value) {
  gSearchTerm = value
}
function getVidById(videoId) {
  return gCache[gSearchTerm].videos.find((video) => video.id === videoId)
}
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
