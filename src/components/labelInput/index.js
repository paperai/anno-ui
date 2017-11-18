/**
 * UI parts - Input Label.
 */
require('!style-loader!css-loader!./index.css')

import * as behavior from './behavior'

let $inputLabel
window.addEventListener('DOMContentLoaded', () => {
    $inputLabel = $('#inputLabel')
})

let _blurListener

let currentUUID

let _getSelectedAnnotations
let _saveAnnotationText

export function setup ({
    getSelectedAnnotations,
    saveAnnotationText,
    createSpanAnnotation,
    createRelAnnotation
}) {
    _getSelectedAnnotations = getSelectedAnnotations
    _saveAnnotationText = saveAnnotationText

    // Start to listen window events.
    listenWindowEvents()

    // Set add button behavior.
    behavior.setupLabelAddButton()

    // Set trash button behavior.
    behavior.setupLabelTrashButton()

    // Set the action when a label is clicked.
    behavior.setupLabelText(createSpanAnnotation, createRelAnnotation)

    // Set tab behavior.
    behavior.seupTabClick()

    // Set import/export link behavior.
    behavior.setupImportExportLink()
}

/**
 * Enable the Label Input UI.
 */
export function enable ({ uuid, text, disable = false, autoFocus = false, blurListener = null }) {

    currentUUID = uuid

    if (_blurListener) {
        _blurListener()
        _blurListener = null
        console.log('old _blurListener is called.')
    }

    $inputLabel
        .attr('disabled', 'disabled')
        .val(text || '')
        .off('blur')
        .off('keyup')

    if (disable === false) {
        $inputLabel
            .removeAttr('disabled')
            .on('keyup', () => {
                saveText(uuid)
            })
    }

    if (autoFocus) {
        $inputLabel.focus()
    }

    $inputLabel.on('blur', () => {
        if (blurListener) {
            blurListener()
            _blurListener = blurListener
        }
        saveText(uuid)
    })
}

/**
 * Disable the Label Input UI.
 */
export function disable () {
    currentUUID = null
    $inputLabel
        .attr('disabled', 'disabled')
        .val('')
}

function treatAnnotationDeleted ({ uuid }) {
    if (currentUUID === uuid) {
        disable(...arguments)
    }
}

function handleAnnotationHoverIn (annotation) {
    if (_getSelectedAnnotations().length === 0) {
        enable({ uuid : annotation.uuid, text : annotation.text, disable : true })
    }
}

function handleAnnotationHoverOut (annotation) {
    if (_getSelectedAnnotations().length === 0) {
        disable()
    }
}

function handleAnnotationSelected (annotation) {
    if (_getSelectedAnnotations().length === 1) {
        enable({ uuid : annotation.uuid, text : annotation.text })
    } else {
        disable()
    }
}

function handleAnnotationDeselected () {
    const annos = _getSelectedAnnotations()
    if (annos.length === 1) {
        enable({ uuid : annos[0].uuid, text : annos[0].text })
    } else {
        disable()
    }
}

/**
 * Save the text an user wrote, to the annotation ( specified by uuid ).
 */
function saveText (uuid) {
    const text = $inputLabel.val() || ''
    _saveAnnotationText(uuid, text)
}

/**
 * Set window event listeners.
 */
function listenWindowEvents () {

    // Enable the text input.
    window.addEventListener('enableTextInput', e => {
        enable(e.detail)
    })

    // Disable the text input.
    window.addEventListener('disappearTextInput', e => {
        disable(e.detail)
    })

    // The event an annotation was deleted.
    window.addEventListener('annotationDeleted', e => {
        treatAnnotationDeleted(e.detail)
    })

    // The event an annotation was hovered in.
    window.addEventListener('annotationHoverIn', e => {
        handleAnnotationHoverIn(e.detail)
    })

    // The event an annotation was hovered out.
    window.addEventListener('annotationHoverOut', e => {
        handleAnnotationHoverOut(e.detail)
    })

    // The event an annotation was selected.
    window.addEventListener('annotationSelected', e => {
        handleAnnotationSelected(e.detail)
    })

    // The event an annotation was deselected.
    window.addEventListener('annotationDeselected', () => {
        handleAnnotationDeselected()
    })
}
