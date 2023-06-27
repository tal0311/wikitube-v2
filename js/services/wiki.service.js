const TY_KEY = 'TYdata'
const WIKI_KEY = 'WIKIdata'
const YT_API_KEY = 'AIzaSyCQ3VQLxhDknZgctC7gsaB2tpWsMuYSN8A'

var gTYdata = loadFromStorage(TY_KEY) || {}
var gWIKIdata = loadFromStorage(WIKI_KEY) || {}
var gSearchTerm = 'vue'

function getYTdata() {
  if (gTYdata[gSearchTerm]) {
    console.log('getting from storage')
    return Promise.resolve(gTYdata[gSearchTerm])
  }
  return axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=${gSearchTerm}`
    )
    .then((res) => {
      videos = prepData(res.data)
      console.log('videos:', videos)
      gTYdata[gSearchTerm] = videos
      saveToStorage(TY_KEY, gTYdata)
      return videos
    })
}

function prepData({ items }) {
  console.log('items:', items)
  return items.map((item) => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      cover: item.snippet.thumbnails.high.url,
      desc: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
    }
  })
}


function getWIKIdata() {
  if (gWIKIdata[gSearchTerm]) {
    console.log('getting from storage')
    return Promise.resolve(gWIKIdata[gSearchTerm])
  }
  return axios
    .get(
      `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${gSearchTerm}&format=json`
    )
    .then((res) => {
      const wikiData = prepWikiData(res.data)
      gWIKIdata[gSearchTerm] = wikiData
      saveToStorage(WIKI_KEY, gWIKIdata)
      return wikiData
    })
}

function prepWikiData({ query: { search: items } }) {
  console.log('wiki res:', items)
  return items.map((item) => {
    return {
      id: item.pageid,
      title: item.title,
      desc: item.snippet,

    }
  })
}

function setSearchTerm(value) {
  gSearchTerm = value
}
function getVidById(divId) {
  return gTYdata[gSearchTerm].find((video) => video.id === divId)
}
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
