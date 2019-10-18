// ==UserScript==
// @name         Github 素质三连
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Github 长按 star, 一键 watch, star, fork
// @author       liubiantao
// @match        https://*.github.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

;(function() {
  'use strict'

  const starButton = document.querySelectorAll(
    'button.btn.btn-sm.btn-with-count.js-toggler-target'
  )[1]
  const watchButton = document.querySelector('button[value=release_only]')
  const forkButton = document.querySelector('.octicon-repo-forked')
    .parentElement

  const getTimeNow = () => new Date().getTime()

  let timeStart, timeEnd, time
  let playing = false

  function playAnimation() {
    playing = true
    console.warn('playAnimation')
  }

  function stopAnimation() {
    playing = false
    console.warn('stopAnimation')
  }

  function combo() {
    starButton.click()
    watchButton.click()
    forkButton.click()
  }

  function holdDown() {
    timeStart = getTimeNow()
    time = setInterval(function() {
      timeEnd = getTimeNow()

      if (timeEnd - timeStart > 200) {
        !playing && playAnimation()
      }

      if (timeEnd - timeStart > 1500) {
        clearInterval(time)
        combo()
      }
    }, 100)
  }

  function holdUp() {
    clearInterval(time)
    playing && stopAnimation()
  }

  starButton.addEventListener('mousedown', holdDown)
  starButton.addEventListener('mouseup', holdUp)
})()
