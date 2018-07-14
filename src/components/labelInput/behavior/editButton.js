import * as core from '../core'
import * as uis from '../../../uis'
import * as db from '../db'
import * as color from '../color'

function setupLabelEditListener (inputField, labelText, editButton, labelChangeListener) {
    const blurListener = (event) => {
        event.stopPropagation()

        const value = inputField.value.trim()
        if (core.isValidInput(value)) {
            // Get <ul class="label-list" data-type="...">
            const labelType = $(inputField).parentsUntil('.label-list').parent()[0].getAttribute('data-type')
            const oldValue = labelText.textContent.trim()
            labelText.textContent = value

            const labelList = db.getLabelList()
            labelList[labelType].labels.forEach((labelObject) => {
                if (labelObject[0] === oldValue) {
                    labelObject[0] = value
                }
            })
            db.saveLabelList(labelList)

            inputField.parentElement.replaceChild(labelText, inputField)
            inputField.removeEventListener('blur', blurListener)
            labelChangeListener({
                text: value,
                annoType: labelType,
                oldText: oldValue
            })
            editButton.classList.remove('disabled')
        } else {
            const modal = uis.alertDialog.show({
                type    : 'alert',
                message : 'Nor white space, tab, or line break are not permitted.'
            })
            modal.on('hide.bs.modal', () => {
                inputField.parentElement.replaceChild(labelText, inputField)
                inputField.removeEventListener('blur', blurListener)
                editButton.classList.remove('disabled')
            })
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
