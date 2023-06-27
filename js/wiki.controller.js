function initWiki() {
  getAllData().then(({ videos, wikiData }) => {
    renderVideoList(videos)
    renderWikiList(wikiData)
  }).catch(console.log)
}

function renderVideoList(videos) {
  const strHtmls = videos.map((video) => {
    const { id, title, cover } = video
    return `
     <article class="vid-preview grid" onclick="onSelectVideo('${id}')">
     <p>${title}</p>
      <img src="${cover}" alt="">
     </article>
    `
  }).join('')

  document.querySelector('.logo').innerHTML = getSvg('logo')
  onSelectVideo(videos[0].id)
  document.querySelector('.video-list').innerHTML = strHtmls
}

function renderWikiList(wikiData) {
  console.log('render wiki data', wikiData);
  const strHtmls = wikiData.map((wiki) => {
    return `
    <li class="wiki-preview" onclick="onSelectWiki( ${wiki.id})">
    <h5>${wiki.title}</h5>
    <small>${wiki.desc}</small>
    </li>
    `
  }).join('')

  document.querySelector('.wiki-list').innerHTML = strHtmls

}

function onSelectWiki(wikiId) {
  window.open(`https://en.wikipedia.org/?curid=${wikiId}`)
}

function onSearch(value) {
  if (!value) return
  setSearchTerm(value)
  getAllData().then(({ videos, wikiData }) => {
    renderVideoList(videos)
    renderWikiList(wikiData)
  })
}

function onSelectVideo(videoId) {
  const video = getVidById(videoId)
  const elMainVideo = document.querySelector('.main-video')
  elMainVideo.querySelector('iframe').src = `https://www.youtube.com/embed/${video.id}?`
  const elInfoContainer = elMainVideo.querySelector('.info-container')
  elInfoContainer.querySelector('.video-desc').innerText = video.desc
}
