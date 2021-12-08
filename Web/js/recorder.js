
async function getStream() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true,
    })

    window._js_stream = stream
    return stream
}

async function record(second = 3) {
    const chunks = []
    const stream = window._js_stream
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9'})
    recorder.start()
    recorder.ondataavailable = (e) => {
        chunks.push(e.data)
    }

    window._js_chunks = chunks
    setTimeout(()=>{
        recorder.stop()
    }, second * 1000)
}
