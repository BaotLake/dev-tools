/**
 * 获取视频流
 * 4K 显示器： 3840*2160
 * MacBook Pro 显示器： 2560*1600
 *
 */

const config = {
    default: {
        video: true,
        audio: true,
    },

    exact: {
        video: {
            width: { exact: 2560 },
            height: { exact: 1600 },
        },
    },

    ideal: {
        video: {
            width: { ideal: 2560 },
            height: { ideal: 1600 },
        },
    },

    min
}

async function test(name = 'default') {
    let stream = await navigator.mediaDevices.getDisplayMedia(config[name])
    let videoTrack = stream.getVideoTracks()[0]
    let capabilities = videoTrack.getCapabilities()

    console.log(capabilities)
}

test('ideal')

// window.addEventListener('click', () => {
//     test('default')
// })
