// 捕获屏幕视频流
async function desktopCapture() {
    const streamID = await new Promise((resolve) => {
        chrome.desktopCapture.chooseDesktopMedia(
            ['screen', 'window', 'tab', 'audio'],
            resolve
        )
    })
    const constraints = {
        audio: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamID,
            },
        },
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamID,
                // maxWidth: 1920,
                // maxHeight: 1080,
                maxFrameRate: 120,
                // minFrameRate: 50,
            },
        },
    }
    const stream = await window.navigator.mediaDevices.getUserMedia(constraints)
    window._js_stream = stream
    return stream
}
