'use strict'

function isMobile() {
 return navigator.userAgentData.mobile
}

function getViews() {
 return Math.floor(Math.random() * 5000)
}

function getFormattedDate(ts) {
 return new Date(ts).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function setConsoleData(isCode, isLI, isColab) {
 var strOps = {
  isCode: "See the code at https://github.com/tal0311/wikitube-v2",
  isLI: 'Contact me At https://www.linkedin.com/in/tal-amit/'
 }
 console.log(`%c ${strOps['isCode']} \n ${strOps['isLI']}`, "color:black; background:#ff0000; font-size:1rem; padding:0 0.4rem; border-radius:4px")
}