import * as core from '../core'
import * as uis from '../../../uis'
import * as db from '../db'

function setupLabelEditListener (inputField, labelText, editButton, labelChangeListener) {
    const alertAndCloseEdit = (message) => {
        const modal = uis.alertDialog.show({ type : 'alert', message : message })
        modal.on('hide.bs.modal', () => {
            inputField.parentElement.replaceChild(labelText, inputField)
            inputField.removeEventListener('blur', blurListener)
            editButton.classList.remove('disabled')
        })
    }

    const blurListener = (event) => {
        event.stopPropagation()

        const isNotChanged = (value, oldValue) => {
            return value === oldValue
        }
        const isNewValue = (labelType, value) => {
            return db.findLabel(labelType, value) === undefined
        }

        // Get <ul class="label-list" data-type="...">
        const labelType = $(inputField).parentsUntil('.label-list').parent()[0].getAttribute('data-type')
        const value = inputField.value.trim()
        const oldValue = labelText.textContent.trim()
        let colorValue
        if (core.isValidInput(value)) {
            // 1. not changed
            // 2. changed to new label
            if (isNotChanged(value, oldValue) || isNewValue(labelType, value)) {
                labelText.textContent = value
                const labelList = db.getLabelList()
                labelList[labelType].labels.forEach((labelObject) => {
                    if (labelObject[0] === oldValue) {
                        labelObject[0] = value
                        colorValue = labelObject[1]
                    }
                })
                db.saveLabelList(labelList)

                inputField.parentElement.replaceChild(labelText, inputField)
                inputField.removeEventListener('blur', blurListener)
                labelChangeListener({
                    color    : colorValue,
                    text     : value,
                    annoType : labelType,
                    oldText  : oldValue
                })
                editButton.classList.remove('disabled')
            } else {
                alertAndCloseEdit('label is duplicated in same type')
            }
        } else {
            alertAndCloseEdit('Nor white space, tab, or line break are not permitted.')
        }
    }

    const keyboardListener = (event) => {
        if (event.type === 'keydown') {
            if (event.key !== 'Enter' || event.altKey || event.ctrlkey || event.shiftKey) {
                return false
            } else {
                event.stopPropagation()
                inputField.removeEventListener('kewdown', keyboardListener)
                inputField.blur()
                return true
            }
        }
    }
    inputField.addEventListener('keydown', keyboardListener)
    inputField.addEventListener('blur', blurListener)
}

export default function (event, labelChangeListener) {
    const labelText = event.currentTarget.parentElement.querySelector('.js-label')
    const inputField = document.createElement('input')
    inputField.setAttribute('type', 'text')
    inputField.classList.add('label-list__input')
    inputField.value = labelText.textContent.trim()
    event.currentTarget.classList.add('disabled')
    setupLabelEditListener(inputField, labelText, event.currentTarget, labelChangeListener)

    event.currentTarget.parentElement.replaceChild(inputField, labelText)
    inputField.focus()
}
