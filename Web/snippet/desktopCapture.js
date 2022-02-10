let sources = ['screen', 'window', 'tab', 'audio']

let streamId = await new Promise((resolve) => {
    chrome.desktopCapture.chooseDesktopMedia(sources, (id) => {
        resolve(id)
    })
})

console.log('streamId: ', streamId, options)

let constraints = {
    audio: {
        mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: streamId,
        },
    },
    video: {
        // width: { exact: 3840 },
        // height: { exact: 2160 },
        mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: streamId,
            minWidth: 2880,
            minHeight: 1800,
            // exactWidth: 2880,
            // exactHeight: 1800,

            // maxWidth: 3840,
            // maxHeight: 2160,
        },
    },
}

let stream = await navigator.mediaDevices.getUserMedia(constraints)

let videoTrack = stream.getVideoTracks()[0]
let capabilities = videoTrack.getCapabilities()

console.log(capabilities)
