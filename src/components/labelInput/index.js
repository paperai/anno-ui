/**
 * UI parts - Input Label.
 */
require('!style-loader!css-loader!./index.css')

import * as core from './core'
import * as behavior from './behavior'
import * as listener from './listener'
import * as color from './color'

/**
 * Setup the Label Input.
 */
export function setup ({
    getSelectedAnnotations,
    saveAnnotationText,
    createSpanAnnotation,
    createRelAnnotation,
    colorChangeListener = function () {},
    namingRuleForExport = behavior.defaultNamingRuleForExport
}) {

    // Define core functions.
    core.setup(saveAnnotationText)

    // Define user actions.
    behavior.setup(createSpanAnnotation, createRelAnnotation, namingRuleForExport)

    // Define window event listeners.
    listener.setup(getSelectedAnnotations)

    color.setup(colorChangeListener)
}

export const getColorMap = color.getColorMap
// export getColorMap

export const loadLabelDbfromUrl = behavior.loadLabelDbfromUrl
