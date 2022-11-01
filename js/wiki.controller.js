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
  document.querySelector(
    '.main-video'
  ).src = `https://www.youtube.com/embed/${videos[0].id}?`

  document.querySelector('.video-list').innerHTML = strHtmls
  // setTimeout(onSearch, 1000)
}

function onSearch(value = 'react') {
  setSearchTerm(value)
  getData().then(renderVideoList)
}
