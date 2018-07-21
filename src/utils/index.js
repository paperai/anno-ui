import toml from 'toml'

/**
 * Make the UI resizable.
 */
export function setupResizableColumns () {
    // Make resizable.
    $('#tools').resizable({
        handles           : 'e',
        alsoResizeReverse : '#viewerWrapper',
        start             : () => {
            $('#viewer iframe').css({
                'pointer-events' : 'none'
            })
        },
        stop : () => {
            $('#viewer iframe').css({
                'pointer-events' : 'auto'
            })
        }
    })

    // Customize.
    $.ui.plugin.add('resizable', 'alsoResizeReverse', {

        start : function () {
            let that = $(this).resizable('instance')
            let o = that.options

            $(o.alsoResizeReverse).each(function () {
                var el = $(this)
                el.data('ui-resizable-alsoresizeReverse', {
                    width  : parseInt(el.width(), 10),
                    height : parseInt(el.height(), 10),
                    left   : parseInt(el.css('left'), 10),
                    top    : parseInt(el.css('top'), 10)
                })
            })
        },

        resize : function (event, ui) {
            let that = $(this).resizable('instance')
            let o = that.options
            let os = that.originalSize
            let op = that.originalPosition
            let delta = {
                height : (that.size.height - os.height) || 0,
                width  : (that.size.width - os.width) || 0,
                top    : (that.position.top - op.top) || 0,
                left   : (that.position.left - op.left) || 0
            }

            $(o.alsoResizeReverse).each(function () {
                let el = $(this)
                let start = $(this).data('ui-resizable-alsoresize-reverse')
                let style = {}
                let css = el.parents(ui.originalElement[0]).length
                        ? [ 'width', 'height' ]
                        : [ 'width', 'height', 'top', 'left' ]

                $.each(css, function (i, prop) {
                    let sum = (start[prop] || 0) - (delta[prop] || 0)
                    if (sum && sum >= 0) {
                        style[prop] = sum || null
                    }
                })

                el.css(style)
            })
        },

        stop : function () {
            $(this).removeData('resizable-alsoresize-reverse')
        }
    })
}

/**
 * Convert label object to TOML String.
 */
export function tomlString (obj, type = null) {
    let lines = []

    Object.keys(obj).forEach(prop => {
        let val = obj[prop]
        if (prop === 'span' || prop === 'relation') {
            lines.push(tomlString(val, prop))
        } else if (prop === 'labels') {
            if (isArray(val)) {
                val.forEach(v => {
                    if (type !== null) {
                        lines.push(`[[${type}]]`)
                    }
                    lines.push(`label = "${v[0]}"`)
                    lines.push(`color = "${v[1]}"`)
                    lines.push('')
                })
            }
        }
    })

    return lines.join('\n')
}

/**
 * Convert TOML String to label object.
 *
 * @export
 * @param {String} tomlData
 */
export function toml2object (tomlData) {
    const data = toml.parse(tomlData)
    const object = {}
    ;['span', 'relation'].forEach(type => {
        object[type] = {}
        object[type].labels = []
        if (isArray(data[type])) {
            data[type].forEach(item => {
                object[type].labels.push([item.label, item.color])
            })
        }
    })

    return object
}

/**
 * Check the value is array.
 */
function isArray (val) {
    return val && 'length' in val
}

/**
 * Generate a universally unique identifier
 *
 * @return {String}
 */
export function uuid (len = 8) {

    // Length of ID characters.
    const ID_LENGTH = len

    // Candidates.
    const BASE = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    // The number of candidates.
    const BASE_LEN = BASE.length

    let id = ''
    for (let i = 0; i < ID_LENGTH; i++) {
        id += BASE[ Math.floor(Math.random() * BASE_LEN) ]
    }
    return id
}

/**
 * Download a content with the fileName.
 */
export function download (fileName, content) {
    let blob = new Blob([content])
    let blobURL = window.URL.createObjectURL(blob)
    let a = document.createElement('a')
    document.body.appendChild(a) // for Firefox working correctly.
    a.download = fileName
    a.href = blobURL
    a.click()
    a.parentNode.removeChild(a)
}

/**
 * Load a file as a text.
 */
export function loadFileAsText (file) {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader()
        fileReader.onload = event => {
            const text = event.target.result
            resolve(text)
        }
        fileReader.onerror = err => {
            reject(err)
        }
        fileReader.readAsText(file)
    })
}
