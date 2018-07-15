import * as annoUiCore from '../../core'

/**
 * Storage for label settings.
 */

// LocalStorage key to save label data.
function LSKEY_LABEL_LIST () {
    return annoUiCore.applicationName() + '-label-list'
}

/**
 * Get the labels from the storage.
 */
export function getLabelList () {
    return JSON.parse(localStorage.getItem(LSKEY_LABEL_LIST()) || '{}')
}

/**
 * Save the labels to the storage.
 */
export function saveLabelList (data) {
    localStorage.setItem(LSKEY_LABEL_LIST(), JSON.stringify(data))
}

/**
 * search the label fron the storage.
 * @param labelType {span|one-way|two-way|link}
 * @param labelText the inputted string on label editor
 * @return labelObject (Array of [labelText, labelColor]) or undefined
 */
export function findLabel (labelType, labelText) {
    const labelList = getLabelList()
    if (labelList[labelType] === undefined) {
        return undefined
    }
    const labelCount = labelList[labelType].labels.length
    for (let index = 0; index < labelCount; index++) {
        if (labelList[labelType].labels[index][0] === labelText) {
            return labelList[labelType].labels[index]
        }
    }
    return undefined
}
