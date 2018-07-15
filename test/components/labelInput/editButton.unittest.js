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
    before(function () {
        this.labelType = 'span'
        this.labelTextContent = 'ThisIsLabel-1'
        this.labelColor = '#f15'

        this.labeldb = db.getLabelList()
        this.labeldb[this.labelType].labels.push([this.labelTextContent, this.labelColor])
        db.saveLabelList(this.labeldb)
    })
    beforeEach(function () {
        this.labelList = document.createElement('ul')
        this.labelList.classList.add('label-list')
        this.labelList.setAttribute('data-type', this.labelType)
        this.labelInput = document.createElement('li')
        this.labelInput.classList.add('label-list__item')

        const editLabel = document.createElement('i')
        const editButton = document.createElement('div')
        editButton.classList.add('js-label-edit')
        editButton.appendChild(editLabel)
        const labelText = document.createElement('div')
        labelText.textContent = this.labelTextContent + '\n'
        labelText.classList.add('label-list__text')
        labelText.classList.add('js-label')

        this.labelInput.appendChild(editButton)
        this.labelInput.appendChild(document.createTextNode('\n'))
        this.labelInput.appendChild(labelText)
        this.labelInput.appendChild(document.createTextNode('\n'))
        this.labelList.appendChild(this.labelInput)
        this.labelList.appendChild(document.createTextNode('\n'))

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
            const inputField = $('.label-list__input')[0]
            if (inputField) {
                inputField.blur()
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
    function beforeEachForInputFinished (newValue, done) {
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
        $('.js-label-edit').click()
        $('.label-list__input').val(newValue)
        // focus out or hit enter key
    }
    function testsForInvalidValue () {
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
                    return labelObject[0] === this.newValidLabel && labelObject[1] === this.labelColor
                })
                const oldLabelObject = db.getLabelList()[this.labelType].labels.filter((labelObject) => {
                    return labelObject[0] === this.labelTextContent && labelObject[1] === this.labelColor
                })
                assert.strictEqual(oldLabelObject.length, 1, 'old label does not exist')
                assert.strictEqual(newLabelObject.length, 0, 'new ValidLabel exists')
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
            it('should call labelChangeListener with argument {text, annoType, oldText}', function () {
                assert.ok(this.labelChangeListener.calledOnce)
                assert.deepStrictEqual(
                    this.labelChangeListener.firstCall.args[0],
                    {
                        text: this.newValidLabel,
                        annoType: this.labelType,
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
                assert.strictEqual(newLabelObject.length, 1, 'new ValidLabel does not exist')
                assert.strictEqual(oldLabelObject.length, 0, 'old label exists')
            })
        })

        context('input value is invalid', function () {
            context('when value includes space', function () {
                beforeEach(function (done) {
                    // TODO: 変数名直し忘れ。newInvalidLabel
                    this.newValidLabel = this.labelTextContent + ' updated'
                    beforeEachForInputFinished(this.newValidLabel, done)
                    $('.label-list__input')[0].blur()
                })
                afterEach(function () {
                    db.saveLabelList(this.labeldb)
                    ui.alertDialog.show.restore()
                })
                testsForInvalidValue()
            })        

            context('when valuencludes tab-code(`\\t`)', function () {
                beforeEach(function (done) {
                    // TODO: 変数名直し忘れ。newInvalidLabel
                    this.newValidLabel = this.labelTextContent + '\tupdated'
                    beforeEachForInputFinished(this.newValidLabel, done)
                    $('.label-list__input')[0].blur()
                })
                afterEach(function () {
                    db.saveLabelList(this.labeldb)
                    ui.alertDialog.show.restore()
                })
                testsForInvalidValue()
            })
        })
        context('input value is alreay exist in list', function () {
            beforeEach(function (done) {
                this.duplicatedLabel = (new Date()).getTime() + '_dupilicated'

                const duplicatedLabel = document.createElement('li')
                duplicatedLabel.classList.add('label-list__item')
                const labelText = document.createElement('div')
                labelText.textContent = this.duplicatedLabel + '\n'
                labelText.classList.add('label-list__text')
                labelText.classList.add('js-label')
                duplicatedLabel.appendChild(labelText)
                this.labelList.appendChild(duplicatedLabel)
                this.labelList.appendChild(document.createTextNode('\n'))

                const labeldb = db.getLabelList()
                labeldb[this.labelType].labels.push([this.duplicatedLabel, this.labelColor])
                db.saveLabelList(labeldb)

                beforeEachForInputFinished(this.duplicatedLabel, done)
                $('.label-list__input')[0].blur()
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
            it('should call labelChangeListener with argument {text, annoType, oldText}', function () {
                assert.ok(this.labelChangeListener.calledOnce)
                assert.deepStrictEqual(
                    this.labelChangeListener.firstCall.args[0],
                    {
                        text: this.newValidLabel,
                        annoType: this.labelType,
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
                assert.strictEqual(newLabelObject.length, 1, 'new ValidLabel does not exist')
                assert.strictEqual(oldLabelObject.length, 0, 'old label exists')
            })
        })

        context('input value is invalid', function () {
            context('value includes space', function () {
                beforeEach(function (done) {
                    this.newValidLabel = this.labelTextContent + ' updated'
                    beforeEachForInputFinished(this.newValidLabel, done)
                    $('.label-list__input')[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
                })
                afterEach(function () {
                    db.saveLabelList(this.labeldb)
                    ui.alertDialog.show.restore()
                })
                testsForInvalidValue()
            })

            context('value includes tab-code(`\\t`)', function () {
                beforeEach(function (done) {
                    this.newValidLabel = this.labelTextContent + '\tupdated'
                    beforeEachForInputFinished(this.newValidLabel, done)

                    $('.label-list__input')[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
                })
                afterEach(function () {
                    db.saveLabelList(this.labeldb)
                    ui.alertDialog.show.restore()
                })
                testsForInvalidValue()
            })
        })
    })
})
