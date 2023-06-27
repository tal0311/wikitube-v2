function initWiki() {
  getData().then(renderVideoList)
}

function renderVideoList(videos) {
  const strHtmls = videos.map((video) => {
    const { id, title, cover } = video
    return `
     <article onclick="onSelectVideo('${id}')">
      <img  src="${cover}" alt="">
      <h4>${title}</h4>
     </article>
    `
  })

  document.querySelector('.logo').innerHTML = getSvg('logo')
  onSelectVideo(videos[0].id)
  document.querySelector('.video-list').innerHTML = strHtmls
}

function onSearch(value = 'react') {
  setSearchTerm(value)
  getData().then(renderVideoList)
}

function onSelectVideo(videoId) {
  const video = getVidById(videoId)
  const elMainVideo = document.querySelector('.main-video')
  elMainVideo.querySelector('iframe').src = `https://www.youtube.com/embed/${video.id}?`
  const elInfoContainer = elMainVideo.querySelector('.info-container')
  elInfoContainer.querySelector('.video-desc').innerText = video.desc
}
