/**
 * UI parts - Download Button.
 */

/**
 * Setup the behavior of a Download Button.
 */
export function setup ({
    getAnnotationTOMLString,
    getDownloadFileName,
    didDownloadCallback = function () {}
}) {
    $('#downloadButton').off('click').on('click', e => {
        $(e.currentTarget).blur()

        getAnnotationTOMLString().then(annotations => {
            let blob = new Blob([annotations])
            let blobURL = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            document.body.appendChild(a) // for firefox working correctly.
            a.download = _getDownloadFileName(getDownloadFileName)
            a.href = blobURL
            a.click()
            a.parentNode.removeChild(a)
        })

        didDownloadCallback()

        return false
    })
}

/**
 * Get the file name for download.
 */
function _getDownloadFileName (getDownloadFileName) {

    // The name of Primary Annotation.
    let primaryAnnotationName
    $('#dropdownAnnoPrimary a').each((index, element) => {
        let $elm = $(element)
        if ($elm.find('.fa-check').hasClass('no-visible') === false) {
            primaryAnnotationName = $elm.find('.js-annoname').text()
        }
    })
    if (primaryAnnotationName) {
        return primaryAnnotationName
    }

    // The name of Annotation file.
    return getDownloadFileName()
}
