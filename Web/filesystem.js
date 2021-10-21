async function initFS() {
    const requestFileSystem =
        window.requestFileSystem || window.webkitRequestFileSystem
    const fs = await new Promise(function (resolve, reject) {
        requestFileSystem(
            window.PERSISTENT,
            1024 * 1024 * 50,
            function (fs) {
                resolve(fs)
            },
            console.error
        )
    })

    console.log('fs name: ', fs.name, 'root: ', fs.root)
    window._js_fs = fs
    return fs
}

async function changeDir(path) {
    const rootEntry = window._js_fs.root
    const dirEntry = await new Promise((resolve, reject) => {
        rootEntry.getDirectory(
            path,
            {},
            function (dirEntry) {
                resolve(dirEntry)
            },
            function (error) {
                console.error(error)
                reject()
            }
        )
    })
    window._js_dir = dirEntry
    console.log('dir: ', dirEntry)
}

async function lsDir() {
    const dirEntry = window._js_dir || window._js_fs.root
    const dirReader = dirEntry.createReader()
    const entries = await new Promise((resolve, reject) => {
        dirReader.readEntries(
            function (results) {
                resolve(results)
            },
            function (error) {
                console.error(error)
                reject()
            }
        )
    })

    console.log('entries: ', entries)
}

async function rmAll() {
    const rootEntry = window._js_fs.root
    const dirReader = rootEntry.createReader()
    const entries = await new Promise((resolve, reject) => {
        dirReader.readEntries(
            function (results) {
                resolve(results)
            },
            function (error) {
                console.error(error)
                reject()
            }
        )
    })
    console.log('entries: ', entries)
    entries.forEach((entry) => {
        if (entry.isFile) entry.remove(console.log, console.error)
        if (!entry.isFile) entry.removeRecursively(console.log, console.error)
    })
}

/**
 * 查找file
 * @param {string} name file name
 */
async function findFile(name = '*') {
    const fs = window._js_fs
    const fileEntry = await new Promise((resolve, reject) => {
        fs.root.getFile(
            name,
            {},
            function (fileEntry) {
                resolve(fileEntry)
            },
            function (e) {
                console.error('e', e)
                reject()
            }
        )
    })
    console.log('File Entry: ', fileEntry)

    const file = await new Promise((resolve, reject) => {
        fileEntry.file(
            function (file) {
                resolve(file)
            },
            function (e) {
                console.error(e)
                reject()
            }
        )
    })
    window._js_file = file
    console.log('file ', file)
}

async function downloadFind() {
    const file = window._js_file
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = 'a.mp4'
    a.click()
}
