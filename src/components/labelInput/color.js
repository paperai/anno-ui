// labelInput/color.js
import * as db from './db'

/**
 * Colors for a picker.
 */
export const colors = [
    // pick from https://www.materialui.co/colors.
    '#FFEB3B', // yellow
    '#FF5722', // orange
    '#795548', // brown
    '#F44336', // red
    '#E91E63', // pink
    '#9C27B0', // purple
    '#3F51B5', // blue
    '#4CAF50'  // green
]

let _colorChangeListener

export function setup (colorChangeListener) {
    _colorChangeListener = colorChangeListener
}

export function choice () {
    return colors[Math.floor(Math.random() * colors.length) % colors.length]
}

export function getPaletteColors () {
    return [
        colors.slice(0, Math.floor(colors.length / 2)),
        colors.slice(Math.floor(colors.length / 2), colors.length)
    ]
}

/**
* Find a color for the text in the type.
*/
export function find (type, text) {

    // Default color.
    let color = colors[0]

    const labelList = db.getLabelList()
    labelList[type].labels.forEach(item => {
        // old style.
        if (typeof item === 'string') {
            return
        }
        const [aText, aColor] = item
        if (text === aText) {
            color = aColor
        }
    })

    return color
}

export function notifyColorChanged ({ text, color, uuid ,annoType }) {
    _colorChangeListener(...arguments)
}
