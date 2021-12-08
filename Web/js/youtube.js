
/**
 *
 * @param {Event} e
 */
function handleVisibilityChange(e) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    // console.log('visibilitychange: ', e)
}

document.addEventListener('visibilitychange', handleVisibilityChange, true)


