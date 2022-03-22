/**
 *  MacBook Pro M1
 *  Display
 *      Display Type:	Built-In Retina LCD
 *      Resolution:	2560 x 1600 Retina
 *      Main Display:	Yes
 *      Mirror:	Off
 *      Online:	Yes
 *      Automatically Adjust Brightness:	No
 *      Connection Type:	Internal
 */

async function testDefault() {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
    const videoTrack = stream.getVideoTracks()[0]
    const capabilities = videoTrack.getCapabilities()

    console.group('default constraints')
    console.log('max vdieo width: ', capabilities.width.max)
    console.log('max vdieo height: ', capabilities.height.max)
    console.groupEnd('default constraints')
}

async function testSpecific() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            width: 2560,
            height: 1600,
        },
    })
    const videoTrack = stream.getVideoTracks()[0]
    const capabilities = videoTrack.getCapabilities()

    console.group('specific')
    console.log('max vdieo width: ', capabilities.width.max)
    console.log('max vdieo height: ', capabilities.height.max)
    console.groupEnd('specific')
}

async function testIdeal() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            width: {
                ideal: 2560,
            },
            height: {
                ideal: 1600,
            },
        },
    })
    const videoTrack = stream.getVideoTracks()[0]
    const capabilities = videoTrack.getCapabilities()

    console.group('ideal')
    console.log('max vdieo width: ', capabilities.width.max)
    console.log('max vdieo height: ', capabilities.height.max)
    console.groupEnd('ideal')
}

async function testRange() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            width: {
                min: 2560,
            },
            height: {
                min: 1600,
            },
        },
    })
    const videoTrack = stream.getVideoTracks()[0]
    const capabilities = videoTrack.getCapabilities()

    console.group('range')
    console.log('max vdieo width: ', capabilities.width.max)
    console.log('max vdieo height: ', capabilities.height.max)
    console.groupEnd('range')
}


await testDefault()
await testSpecific()
await testIdeal()
// await testRange()  // not supported

/**
 *  The max value I get is `1920 * 1080`
 *  This is no expected.
 *  Because the resolution of my monitor is `2560 * 1600`.
 */
