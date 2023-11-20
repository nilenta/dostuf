//META{"name":"GMedia"}*//
/*
    Defines a plugin for BetterDiscord that allows for the playback of multimedia content using HTML5 audio and video.
    Builds on the premise of mediaSupport.plugin.js. This plugin also formats metadata and provides looping controls.
*/

var GMedia = function () { }
GMedia.prototype = {
  start: function () { this.convert() },
  load: function () { },
  unload: function () { },
  stop: function () { },
  onMessage: function () { setTimeout(this.convert(), 3000) },
  onSwitch: function () { this.convert() },
  observer: function (e) { setTimeout(this.convert(), 3000) },
  getSettingsPanel: function () { return '' },
  getName: function () { return 'GMedia' },
  getDescription: function () { return 'Adds support for HTML5 media files. Now includes looping audio/video. Based on mediaSupport.plugin.js' },
  getVersion: function () { return '2.0.0-natsu' },
  getAuthor: function () { return 'gn0mesort & natsu' },
  convert: function () {
    let targets = $('.attachment-inner a, .markup>a, .attachment-inner img')
    let scroller = $('.scroller.messages')[0]
    let scroll = scroller ? scroller.scrollHeight - scroller.scrollTop === scroller.clientHeight : false
    let dataFound = false
    for (let i = targets.length - 1; i >= 0; --i) {
      let target = $(targets[i])
      if (!target.attr('handled.gnomesort.media') && target.attr('href')) {
        let href = target.attr('href').replace(/^(https?)/g, 'https')
        let type = href.split('.')[href.split('.').length - 1].replace(/mp3/g, 'mpeg')
        let fileName = href.split('/')[href.split('/').length - 1]
        let loopControl = 'Loop: <input type="checkbox" name="loop" style="vertical-align: middle" onchange="$(this).parent().parent().find(\'video, audio\').attr(\'loop\', this.checked)" />'
        let metaDataElement = $(`<div class="metadata gnomesort-metadata" style="font-size: 11px; color: gray"><a href="${href}" style="font-size: 11px; display: inline" handled.gnomesort.media="true">${fileName}</a> - ${type} - ${loopControl}</div>`)
        let metaData = null
        let data = null

        if (type === 'mp4' || type === 'webm' || type === 'mov' || type === 'mkv') {
          data = $(`<video style="max-width: 100%; height: auto;" src="${encodeURI(href)}" type="video/${type}" controls=""></video>`)
        } else if (type === 'mpeg' || type === 'ogg' || type === 'wav') {
          data = $(`<audio src="${encodeURI(href)}" type="audio/${type}" controls=""></audio>`)
        }

        if (data) {
          dataFound = true
          console.log(`Media Found! type is ${type} & href is ${href}`)
          target.replaceWith(data)
          metaData = data.parent().find('.metadata:not(.gnomesort-metadata)')
          if (metaData.length > 0) {
            metaData.replaceWith(metaDataElement)
          } else {
            data.parent().append(metaDataElement)
          }
          data.parent().attr('handled.gnomesort.media', true)
        }
      }
    }
    if (scroll && dataFound) {
      scroller.scrollTop = scroller.scrollHeight
      console.log('Scrolling to most recent!')
    }
  }
}