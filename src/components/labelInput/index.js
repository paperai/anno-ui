/**
 * UI parts - Input Label.
 */
require('!style-loader!css-loader!./index.css')

import * as core from './core'
import * as behavior from './behavior'
import * as listener from './listener'

/**
 * Setup the Label Input.
 */
export function setup ({
    getSelectedAnnotations,
    saveAnnotationText,
    createSpanAnnotation,
    createRelAnnotation
}) {

    // Define core functions.
    core.setup(saveAnnotationText)

    // Define user actions.
    behavior.setup(createSpanAnnotation, createRelAnnotation)

    // Define window event listeners.
    listener.setup(getSelectedAnnotations)
}
