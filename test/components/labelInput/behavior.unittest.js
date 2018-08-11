/* global describe, context, it */
import assert from 'assert'
import sinon from 'sinon'

// Test target
import * as labelInputBehavior from '../../../src/components/labelInput/behavior/index.js'

// For stub
import * as db from '../../../src/components/labelInput/db'
import * as color from '../../../src/components/labelInput/color.js'

describe('labelInput/Behavior', () => {
    before(() => {
        db.saveLabelList({})
    })
    after(() => {
        db.saveLabelList({})
    })

    context('setup without GUI parts', () => {
        it('is OK', () => {
            labelInputBehavior.setup(
                () => { }, // createSpanAnnotation
                () => { }, // createRelAnnotation
                labelInputBehavior.defaultNamingRuleForExport 
            )
        })
    })

    context('setup with GUI parts', () => {
        beforeEach(function () {
            this.rootElement = document.createElement('div')
            // Tab head (span)
            this.labelTabSpan = document.createElement('a')
            this.labelTabSpan.classList.add('js-label-tab')
            this.labelTabSpan.setAttribute('data-type', 'span')
            this.rootElement.appendChild(this.labelTabSpan)
            // Tab head (relation)
            this.labelRelation = document.createElement('a')
            this.labelRelation.classList.add('js-label-tab')
            this.labelRelation.setAttribute('data-type', 'relation')
            this.rootElement.appendChild(this.labelRelation)
            // Tab content
            this.tabContent = document.createElement('div')
            this.tabContent.classList.add('js-label-tab-content')
            this.rootElement.appendChild(this.tabContent)

            // Other parts
            this.colorButton = document.createElement('a')
            this.colorButton.classList.add('js-lable-palette')
            this.rootElement.appendChild(this.colorButton)
            this.addLabelButton = document.createElement('a')
            this.addLabelButton.classList.add('js-add-label-button')
            this.rootElement.appendChild(this.addLabelButton)
            this.trushButton =document.createElement('a')
            this.trushButton.classList.add('js-label-trush')
            this.rootElement.appendChild(this.trushButton)
            this.label = document.createElement('div')
            this.label.classList.add('js-label')
            this.rootElement.appendChild(this.label)
            this.exportButton = document.createElement('a')
            this.exportButton.classList.add('js-export-pabel')
            this.rootElement.appendChild(this.exportButton)
            this.importButton = document.createElement('a')
            this.importButton.classList.add('js-import-label')
            this.rootElement.appendChild(this.importButton)
            this.importUploader = document.createElement('input')
            this.importUploader.setAttribute('type', 'file')
            this.importUploader.classList.add('js-import-file')
            this.rootElement.appendChild(this.importUploader)

            document.body.appendChild(this.rootElement)

            labelInputBehavior.setup(
                () => { }, // createSpanAnnotation
                () => { }, // createRelAnnotation
                labelInputBehavior.defaultNamingRuleForExport 
            )
        })
        afterEach(function () {
            document.body.removeChild(this.rootElement)
        })

        it('should be created `span` tab content to `.js-label-tab-content`', function () {
            const ul = this.tabContent.querySelectorAll('ul.tab-pane.label-list')
            assert.strictEqual(1, ul.length)
            assert.strictEqual('span', ul[0].getAttribute('data-type'))
            assert.ok(ul[0].classList.contains('active'))
        })

        context('`ul.label-list`on span tab', function () {
            beforeEach(function () {
                this.listElements = this.tabContent.querySelectorAll('ul.label-list > li.label-list__item')
            })

            it('should have two element', function () {
                assert.strictEqual(2, this.listElements.length)
            })

            context('the first element', function () {
                beforeEach(function () {
                    this.firstElement = this.listElements[0]
                })

                it('should be label-list button', function () {
                    assert.ok(this.firstElement.querySelector('div.label-list__btn'))
                })

                it('should have edit-button, trush-button, color-picker, and label-text', function () {
                    const editButton = this.firstElement.querySelector('div.label-list__btn.js-label-edit')
                    assert.ok(editButton, 'editButton does not exist')
                    assert.strictEqual('0', editButton.getAttribute('data-index'))

                    const trushButton = this.firstElement.querySelector('div.label-list__btn.js-label-trash')
                    assert.ok(trushButton, 'trushButton does not exist')
                    assert.strictEqual('0', trushButton.getAttribute('data-index'))
            
                    const colorPicker = this.firstElement.querySelector('input.js-label-palette')
                    assert.ok(colorPicker, 'colorPicker does not exist')
                    assert.strictEqual('text', colorPicker.getAttribute('type'))
                    assert.strictEqual('color', colorPicker.getAttribute('name'))
                    assert.strictEqual('off', colorPicker.getAttribute('autoComplete'))
                    assert.strictEqual(color.colors[0], colorPicker.getAttribute('data-color'))
                    assert.strictEqual('0', colorPicker.getAttribute('data-index'))

                    const labelText = this.firstElement.querySelector('.label-list__text.js-label')
                    assert.strictEqual('span1', labelText.textContent.trim())
                })

                it('should same value `data-index` attribute both editButton, trushButton and colorPicker', function () {
                    const editButton = this.firstElement.querySelector('div.label-list__btn.js-label-edit')
                    const trushButton = this.firstElement.querySelector('div.label-list__btn.js-label-trash')
                    const colorPicker = this.firstElement.querySelector('input.js-label-palette')

                    assert.strictEqual(
                        editButton.getAttribute('data-index'),
                        trushButton.getAttribute('data-index')
                    )
                    assert.strictEqual(
                        trushButton.getAttribute('data-index'),
                        colorPicker.getAttribute('data-index')
                    )
                })
            })

            context('the second element', function () {
                beforeEach(function () {
                    this.secondElement = this.listElements[1]
                })

                it('should be add label button', function () {
                    assert.ok(this.secondElement.querySelector('div.label-list__btn.js-add-label-button'))
                })

                it('should have input field for label-text', function () {
                    const inputField = this.secondElement.querySelector('input.label-list__input')
                    assert.ok(inputField)
                    assert.strictEqual('text', inputField.getAttribute('type'))
                })
            })
        })

        context('`.js-label-tab` click event listener', () => {
            context('click evnet is occurred (relation button)', () => {
                it('should be erased current tab content and be created content for clicked', function (done) {
                    // check before
                    assert.ok(this.tabContent.querySelector('ul.tab-pane.label-list[data-type="span"]'))

                    $('.js-label-tab[data-type="relation"]').click()

                    setTimeout(
                        () => {
                            // test
                            const ul = this.tabContent.querySelectorAll('ul.tab-pane.label-list')
                            assert.strictEqual(1, ul.length)
                            assert.strictEqual('relation', ul[0].getAttribute('data-type'))
                            assert.ok(ul[0].classList.contains('active'))

                            done()
                        }, 1000
                    )
                })
            })

            context('click event on `span` tab when label-text does not exist', () => {
                it('should be created initial label-text `span1`')
            })

            context('click event on `relation` tab when label-text does not exist', () => {
                it('should be created initial label-text `relation1`')
            })
        })
    })

    context('defaultNamingRuleForExport', () => {
        it('should call the callback with `pdfanno.conf`', (done) => {
            labelInputBehavior.defaultNamingRuleForExport((value) => {
                assert.strictEqual('pdfanno.conf', value)
                done()
            })
        })
    })

    context('`.js-add-label-button` click event listener', () => {
        it('test is not implemented')
    })

    context('`.js-label-trush` click event listener', () => {
        it('test is not implemented')
    })

    context('`.js-label` click event listener', () => {
        it('test is not implemented')
    })

    context('`.js-export-label` click event listener', () => {
        it('test is not implemented')
    })

    context('`.js-import-label` click event listener', () => {
        it('test is not implemented')
    })

    context('`.js-import-file` change event listener', () => {
        it('test is not implemented')
    })

    context('initalizeLabeldb()', () => {
        before(() => {
            db.getLabelList = sinon.stub()
            db.saveLabelList = sinon.stub()
        })

        function createLabelGui (labelTypes) {
            const tabs = document.createElement('div')
            labelTypes.forEach((type) => {
                const labelTab = document.createElement('div')
                labelTab.classList.add('js-label-tab')
                labelTab.setAttribute('data-type', type)
                tabs.appendChild(labelTab)
            })
            return tabs
        }

        context('when labelList in DB is empty', function () {
            beforeEach(function () {
                db.getLabelList.returns({})
            })

            context('when `.js-label-tab` is `span`, and `relation`', function () {
                beforeEach(function () {
                    this.tabs = createLabelGui(['span', 'relation'])
                    document.body.appendChild(this.tabs)
                    labelInputBehavior.setup( () => { }, () => { })
                })
                afterEach(function () {
                    db.getLabelList.resetHistory()
                    db.saveLabelList.resetHistory()
                    document.body.removeChild(this.tabs)
                })

                it('should set the initial labelList to DB', function () {
                    assert.ok(db.getLabelList.called, 'not called getLabelList')
                    assert.ok(db.saveLabelList.calledOnce, 'not called saveLabelList')
                    assert.ok(typeof(db.saveLabelList.firstCall.args[0] ), Object)
                })
                it('should create label type for `span`, and `relation`', function () {
                    const createdLabelList = db.saveLabelList.firstCall.args[0]
                    assert.strictEqual(Object.keys(createdLabelList).length, 2)
                    assert.ok(createdLabelList['span'])
                    assert.ok(createdLabelList['relation'])
                })
                it('should set label `span1` for `span` label type', function () {
                    const createdLabelList = db.saveLabelList.firstCall.args[0]
                    const createdLabel = {labels: [['span1', color.colors[0]]]}
                    assert.deepStrictEqual(createdLabelList['span'], createdLabel)
                })
                it('should set label `relation1` for other of `span` label type', function () {
                    const createdLabelList = db.saveLabelList.firstCall.args[0]
                    const createdLabel = {labels: [['relation1', color.colors[0]]]}
                    assert.deepStrictEqual(createdLabelList['relation'], createdLabel)
                })
            })

        })

        context('when labelList in DB is not empty', function () {
            beforeEach(function () {
                this.theLabelList = {
                    'span': {labels: [['SPAN10','#fff']]}
                }
                db.getLabelList.returns(this.theLabelList)

                this.tabs = createLabelGui(['span'])
                document.body.appendChild(this.tabs)

                labelInputBehavior.setup( () => { }, () => { })
            })
            afterEach(function () {
                document.body.removeChild(this.tabs)
            })

            it('should not overwrite it', function () {
                assert.ok(db.getLabelList.called, 'not called getLabelList')
                assert.ok(db.saveLabelList.calledOnce, 'not called saveLabelList')
                assert.deepStrictEqual(db.saveLabelList.firstCall.args[0], this.theLabelList)
            })
        })
    })
})
