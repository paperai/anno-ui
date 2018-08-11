/**
 * UI parts - Input Label.
 */
require('!style-loader!css-loader!./index.css')

import * as core from './core'
import * as behavior from './behavior'
import * as listener from './listener'
import * as color from './color'


/**
 * dummy function of labenChangeListener
 *
 * @param annoType ... 'span' | 'relation'
 * @param text ... current label text
 * @param color ... current label color
 * @param oldText ... label text that before be changed (only at label editing)
 */
function dummyLabelChangeListener ({ annoType, text, color, oldText }) { }
/**
 * Setup the Label Input.
 */
export function setup ({
    getSelectedAnnotations,
    saveAnnotationText,
    createSpanAnnotation,
    createRelAnnotation,
    labelChangeListener = dummyLabelChangeListener,
    namingRuleForExport = behavior.defaultNamingRuleForExport
}) {

    // Define core functions.
    core.setup(saveAnnotationText)

    // Define user actions.
    behavior.setup(createSpanAnnotation, createRelAnnotation, namingRuleForExport, labelChangeListener)

    // Define window event listeners.
    listener.setup(getSelectedAnnotations)

    color.setup(labelChangeListener)
}

export const getColorMap = color.getColorMap
// export getColorMap
