/**
 * Storage for label settings.
 */

// LocalStorage key to save label data.
const LSKEY_LABEL_LIST = 'pdfanno-label-list'

/**
 * Get the labels from the storage.
 */
export function getLabelList () {
    return JSON.parse(localStorage.getItem(LSKEY_LABEL_LIST) || '{}')
}

/**
 * Save the labels to the storage.
 */
export function saveLabelList (data) {
    localStorage.setItem(LSKEY_LABEL_LIST, JSON.stringify(data))
}
