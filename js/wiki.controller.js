'use strict'

async function initWiki() {
  const { videos, wikiData } = await getAllData().catch(console.log)
  renderVideoList(videos)
  renderWikiList(wikiData)
  setMobileStatus(isMobile())
  setConsoleData(true, true)
}

function renderVideoList(videos) {
  const strHtmls = videos.map((video) => {
    const { id, title, cover } = video
    return `
     <article class="vid-preview grid" data-title="${title}" onclick="onSelectVideo('${id}')">
     <div class="info-container grid">
     <p>${title}</p>
      <small>${video.channel}</small>
    <div class="video-info grid">
      <span> ${getFormattedDate(video.publishedAt)}</span> 
      <span>Views: ${getViews()}K</span>
    </div>
     </div>
      <img src="${cover}" alt="">
     </article>
    `
  }).join('')

  document.querySelector('.logo').innerHTML = getSvg('logo')
  onSelectVideo(videos[0].id)
  document.querySelector('.video-list').innerHTML = strHtmls
}

function renderWikiList(wikiData) {
  const strHtmls = wikiData.map((wiki) => {
    return `
    <li class="wiki-preview" data-title="${wiki.title}" onclick="onSelectWiki( ${wiki.id})">
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

async function onSearch(value) {
  if (!value) return
  setSearchTerm(value)
  const { videos, wikiData } = await getAllData().catch(console.log)
  renderVideoList(videos)
  renderWikiList(wikiData)
}

function onSelectVideo(videoId) {
  const video = getVidById(videoId)
  const elMainVideo = document.querySelector('.main-video')
  elMainVideo.querySelector('iframe').src = `https://www.youtube.com/embed/${video.id}?`
  const elInfoContainer = elMainVideo.querySelector('.info-container')
  elInfoContainer.querySelector('.video-desc').innerText = video.desc
}


function onUserScroll(ev) {
  const elBody = document.querySelector('body')
  if (window.scrollY > 250) {
    elBody.classList.add('scrolled')
  } else {
    elBody.classList.remove('scrolled')
  }

}

function setMobileStatus(isMobile) {
  const elBody = document.querySelector('body')
  isMobile ? elBody.classList.add('mobile') : elBody.classList.add('desktop')
}