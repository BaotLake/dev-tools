/**
 * 获取视频流
 * 4K 显示器： 3840*2160
 * MacBook Pro 显示器： 2880*1800
 *
 */

const config = {
    default: {
        video: true,
        audio: true,
    },

    exact: {
        video: {
            width: { exact: 3840 },
            height: { exact: 2160 },
        },
    },

    ideal: {
        video: {
            width: { ideal: 3840 },
            height: { ideal: 2160 },
        },
    },
}

async function test(name = 'default') {
    let stream = await navigator.mediaDevices.getDisplayMedia(config[name])
    let videoTrack = stream.getVideoTracks()[0]
    let capabilities = videoTrack.getCapabilities()

    console.log(capabilities)
}

// test('ideal')

window.addEventListener('click', () => {
    test('default')
})
