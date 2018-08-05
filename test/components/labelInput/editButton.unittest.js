import assert from 'assert'
import sinon from 'sinon'

// For set stub
import * as core from '../../../src/components/labelInput/core.js'
import * as ui from '../../../src/uis/'

import * as db from '../../../src/components/labelInput/db'
import * as color from '../../../src/components/labelInput/color'

// Test target
import editButtonClickListener from '../../../src/components/labelInput/behavior/editButton.js'

describe('label edit button on labelInput component', () => {
    function createLabelGui (labelList, labelTextContent) {
        const labelInput = document.createElement('li')
        labelInput.classList.add('label-list__item')

        const editLabel = document.createElement('i')
        const editButton = document.createElement('div')
        editButton.classList.add('js-label-edit')
        editButton.appendChild(editLabel)
        const labelText = document.createElement('div')
        labelText.textContent = labelTextContent + '\n'
        labelText.classList.add('label-list__text')
        labelText.classList.add('js-label')

        labelInput.appendChild(editButton)
        labelInput.appendChild(document.createTextNode('\n'))
        labelInput.appendChild(labelText)
        labelInput.appendChild(document.createTextNode('\n'))

        labelList.appendChild(labelInput)
        labelList.appendChild(document.createTextNode('\n'))

        return labelInput
    }

    before(function () {
        this.labelType = 'span'
        this.labelTextContent = 'ThisIsLabel-1'
        this.labelColor = '#f15'

        this.labeldb = db.getLabelList()
        this.labeldb[this.labelType] = {labels :[[this.labelTextContent, this.labelColor]]}
        db.saveLabelList(this.labeldb)
    })
    after(() => {
        db.saveLabelList({})
    })
    beforeEach(function () {
        this.labelList = document.createElement('ul')
        this.labelList.classList.add('label-list')
        this.labelList.setAttribute('data-type', this.labelType)
        this.labelInput = createLabelGui(this.labelList, this.labelTextContent)

        document.body.appendChild(this.labelList)

        this.labelChangeListener = sinon.spy()

        $(this.labelList).on('click', '.js-label-edit', (event) => {
          editButtonClickListener(event, this.labelChangeListener)
        })
    })
    afterEach(function () {
        db.saveLabelList(this.labeldb)
        document.body.removeChild(this.labelList)
    })

    context('when click event is occurred', function () {
        beforeEach(function () {
            $('.js-label-edit').click()
        })
        afterEach(function () {
            const inputField = $('.label-list__input')
            if (inputField.length !== 0) {
                inputField[0].blur()
            }
        })        

        it(
            'should display `<input class="label-list__input">` and set textContent of `.label-list__text.js-label` that is sibling the event target as value',
            function ()
        {
            const labelInput = this.labelInput.querySelector('.label-list__input')
            assert.ok(labelInput)
            assert.strictEqual(this.labelTextContent, labelInput.value)
        })
        it('should be occurred focus event on `<input class="label-list__input">`', function () {
            const labelInput = this.labelInput.querySelector('.label-list__input')
            assert.strictEqual(document.activeElement, labelInput)
        }) 
        it('should hide `.label-list__text.js-label` that is sibling the event target', function () {
            assert.ok(!this.labelInput.querySelector('.label-list__text.js-label'))
        })
        it('should be disabled `.js-label-edit`', function () {
            assert.ok(this.labelInput.querySelector('.js-label-edit').classList.contains('disabled'))
        })
        it('should not call labelChangeListener', function () {
            assert.ok(this.labelChangeListener.notCalled)
        })
    })

    // function of beforeEach() for context('when be displayed `<input class="label-list__input">` and ...')
    function beforeEachForInputFinished (labelInputGui, newValue, done) {
        sinon.stub(ui.alertDialog, 'show')
        ui.alertDialog.show.returns({
            on: (eventTarget, listener) => {
                setTimeout(
                    () => {
                        listener()
                        done()
                    }, 500
                )
            }
        })
        $(labelInputGui).find('.js-label-edit').click()
        $(labelInputGui).find('.label-list__input').val(newValue)
        // focus out or hit enter key
    }
    function testsForInvalidValue (newValue) {
        it('should show alert dialog', function () {
            assert.ok(ui.alertDialog.show.calledOnce)
            assert.deepStrictEqual(
                ui.alertDialog.show.firstCall.args[0],
                { type: 'alert', message: 'Nor white space, tab, or line break are not permitted.' }
            )
        });

        context('after closed the alert dialog', function () {
            afterEach(function () {
                db.saveLabelList(this.labeldb)
            })

            // In real, alert dialog is shown as modal, user cannot any operation until close it.
            // In test, operation is sequentially because alert dialog is not shown
            it('should hide `<input class="label-list__input">`', function () {
                assert.ok(!this.labelInput.querySelector('.label-list__input'))
                assert.ok(!this.labelInput.querySelector('.js-label-edit').classList.contains('disabled'))
            })
            it('should restore label the before edit state', function () {
                const labelText = this.labelInput.querySelector('.label-list__text.js-label')
                assert.ok(labelText)
                assert.strictEqual(labelText.textContent.trim(), this.labelTextContent)
            })
            it('should not update labelList in db', function () {
                const newLabelObject = db.getLabelList()[this.labelType].labels.filter((labelObject) => {
                    return labelObject[0] === newValue && labelObject[1] === this.labelColor
                })
                const oldLabelObject = db.getLabelList()[this.labelType].labels.filter((labelObject) => {
                    return labelObject[0] === this.labelTextContent && labelObject[1] === this.labelColor
                })
                assert.strictEqual(oldLabelObject.length, 1, 'old label does not exist')
                assert.strictEqual(newLabelObject.length, 0, 'new label exists')
            })
            it('should not call labelChangeListener', function () {
                assert.ok(this.labelChangeListener.notCalled)
            })
        })
    }

    context('when be displayed `<input class="label-list__input">` and focus out this', function () {
        context('input value is valid (that does not include space)', function () {
            beforeEach(function () {
                this.newValidLabel = this.labelTextContent + '_updated' + (new Date()).getTime()
                sinon.spy(core, 'isValidInput')

                $('.js-label-edit').click()
                $('.label-list__input').val(this.newValidLabel)
                $('.label-list__input')[0].blur()
            })
            afterEach(function () {
                db.saveLabelList(this.labeldb)
                core.isValidInput.restore()
            })

            it('should called validator(core.isValidInput) with value of `<input class="label-list__input">`', function () {
                assert.ok(core.isValidInput.calledOnce)
                assert.strictEqual(core.isValidInput.firstCall.args[0], this.newValidLabel)
            })
            it('should call labelChangeListener with argument {annoType, text, color, oldText}', function () {
                assert.ok(this.labelChangeListener.calledOnce)
                assert.deepStrictEqual(
                    this.labelChangeListener.firstCall.args[0],
                    {
                        annoType: this.labelType,
                        text: this.newValidLabel,
                        color: this.labelColor,
                        oldText: this.labelTextContent
                    }
                )
            })
            it('should re-display `.label-list__text.js-label` and set value of `<input class="label-list__input">` as textContent`', function () {
                const labelText = this.labelInput.querySelector('.label-list__text.js-label')
                assert.ok(labelText)
                assert.strictEqual(labelText.textContent.trim(), this.newValidLabel)
            })
            it('should hide `<input class="label-list__input">`', function () {
                assert.ok(!this.labelInput.querySelector('.label-list__input'))
            })
            it('should be enabled `.js-label-edit`', function () {
                assert.ok(!this.labelInput.querySelector('.js-label-edit').classList.contains('disabled'))
            })
            it('should update labelList in db', function () {
                const newLabelObject = db.getLabelList()[this.labelType].labels.filter((labelObject) => {
                    return labelObject[0] === this.newValidLabel && labelObject[1] === this.labelColor
                })
                const oldLabelObject = db.getLabelList()[this.labelType].labels.filter((labelObject) => {
                    return labelObject[0] === this.labelTextContent && labelObject[1] === this.labelColor
                })
                assert.strictEqual(newLabelObject.length, 1, `new ValidLabel does not exist; ${this.newValidLabel}`)
                assert.strictEqual(oldLabelObject.length, 0, 'old label exists')
            })
        })

        context('input value is invalid', function () {
            context('when value includes space', function () {
                beforeEach(function (done) {
                    this.newInvalidLabel = this.labelTextContent + ' updated'
                    beforeEachForInputFinished(this.labelInput,this.newInvalidLabel, done)
                    $('.label-list__input')[0].blur()
                })
                afterEach(function () {
                    db.saveLabelList(this.labeldb)
                    ui.alertDialog.show.restore()
                })
                testsForInvalidValue(this.newInvalidLabel)
            })        

            context('when valuencludes tab-code(`\\t`)', function () {
                beforeEach(function (done) {
                    this.newInvalidLabel = this.labelTextContent + '\tupdated'
                    beforeEachForInputFinished(this.labelInput, this.newinValidLabel, done)
                    $('.label-list__input')[0].blur()
                })
                afterEach(function () {
                    db.saveLabelList(this.labeldb)
                    ui.alertDialog.show.restore()
                })
                testsForInvalidValue(this.newInvalidLabel)
            })
        })

        context('input value is alreay exist in list', function () {
            beforeEach(function (done) {
                this.duplicatedLabel = (new Date()).getTime() + '_dupilicated'
                createLabelGui(this.labelList, this.duplicateLabel)

                const labeldb = db.getLabelList()
                labeldb[this.labelType].labels.push([this.duplicatedLabel, this.labelColor])
                db.saveLabelList(labeldb)

                beforeEachForInputFinished(this.labelInput, this.duplicatedLabel, done)
                $(this.labelInput).find('.label-list__input')[0].blur()
            })
            afterEach(function () {
                ui.alertDialog.show.restore()
            })

            it('should show alert dialog', function () {
                assert.ok(ui.alertDialog.show.calledOnce)
                assert.deepStrictEqual(
                    ui.alertDialog.show.firstCall.args[0],
                    { type: 'alert', message: 'label is duplicated in same type' }
                )
            })
        })
    })

    context('when be displayed `<input class="label-list__input">` and input Enter-key', function () {
        context('input value is valid (that does not include space)', function () {
            beforeEach(function () {
                this.newValidLabel = this.labelTextContent + '_updated' + (new Date()).getTime()
                sinon.spy(core, 'isValidInput')

                $('.js-label-edit').click()
                $('.label-list__input').val(this.newValidLabel)
                $('.label-list__input')[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
            })
            afterEach(function () {
                db.saveLabelList(this.labeldb)
                core.isValidInput.restore()
            })

            it('should called validator(core.isValidInput) with value of `<input class="label-list__input">`', function () {
                assert.ok(core.isValidInput.calledOnce)
                assert.strictEqual(core.isValidInput.firstCall.args[0], this.newValidLabel)
            })
            it('should call labelChangeListener with argument {annoType, text, color,oldText}', function () {
                assert.ok(this.labelChangeListener.calledOnce)
                assert.deepStrictEqual(
                    this.labelChangeListener.firstCall.args[0],
                    {
                        annoType: this.labelType,
                        text: this.newValidLabel,
                        color: this.labelColor,
                        oldText: this.labelTextContent
                    }
                )
            })
            it('should re-display `.label-list__text.js-label` and set value of `<input class="label-list__input">` as textContent`', function () {
                const labelText = this.labelInput.querySelector('.label-list__text.js-label')
                assert.ok(labelText)
                assert.strictEqual(labelText.textContent.trim(), this.newValidLabel)
            })
            it('should hide `<input class="label-list__input">`', function () {
                assert.ok(!this.labelInput.querySelector('.label-list__input'))
            })
            it('should be enabled `.js-label-edit`', function () {
                assert.ok(!this.labelInput.querySelector('.js-label-edit').classList.contains('disabled'))
            })
            it('should update labelList in db', function () {
                const newLabelObject = db.getLabelList()[this.labelType].labels.filter((labelObject) => {
                    return labelObject[0] === this.newValidLabel && labelObject[1] === this.labelColor
                })
                const oldLabelObject = db.getLabelList()[this.labelType].labels.filter((labelObject) => {
                    return labelObject[0] === this.labelTextContent && labelObject[1] === this.labelColor
                })
                assert.strictEqual(newLabelObject.length, 1, `new ValidLabel does not exist; ${this.newValidLabel}`)
                assert.strictEqual(oldLabelObject.length, 0, 'old label exists')
            })
        })

        context('input value is invalid', function () {
            context('value includes space', function () {
                beforeEach(function (done) {
                    this.newInvalidLabel = this.labelTextContent + ' updated'
                    beforeEachForInputFinished(this.labelInput, this.newInvalidLabel, done)
                    $('.label-list__input')[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
                })
                afterEach(function () {
                    db.saveLabelList(this.labeldb)
                    ui.alertDialog.show.restore()
                })
                testsForInvalidValue(this.newInvalidLabel)
            })

            context('value includes tab-code(`\\t`)', function () {
                beforeEach(function (done) {
                    this.newInvalidLabel = this.labelTextContent + '\tupdated'
                    beforeEachForInputFinished(this.labelInput, this.newInvalidLabel, done)

                    $('.label-list__input')[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
                })
                afterEach(function () {
                    db.saveLabelList(this.labeldb)
                    ui.alertDialog.show.restore()
                })
                testsForInvalidValue(this.newInvalidLabel)
            })
        })
    })
})
