/* global describe, context, it */
import assert from 'assert'
import sinon from 'sinon'

// For stub
import * as db from '../../../src/components/labelInput/db'

// Test target
import * as behavior from '../../../src/components/labelInput/behavior'
import * as color from  '../../../src/components/labelInput/color'

describe('Label input behavior', () => {
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

            context('when `.js-label-tab` is `span`, `one-way`,`two-way`, and `link`', function () {
                beforeEach(function () {
                    this.tabs = createLabelGui(['span', 'one-way', 'two-way', 'link'])
                    document.body.appendChild(this.tabs)
                    behavior.setup( () => { }, () => { })
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
                it('should create label type for `span`, `one-way`,`two-way`, and `link`', function () {
                    const createdLabelList = db.saveLabelList.firstCall.args[0]
                    assert.strictEqual(Object.keys(createdLabelList).length, 4)
                    assert.ok(createdLabelList['span'])
                    assert.ok(createdLabelList['one-way'])
                    assert.ok(createdLabelList['two-way'])
                    assert.ok(createdLabelList['link'])
                })
                it('should set label `span1` for `span` label type', function () {
                    const createdLabelList = db.saveLabelList.firstCall.args[0]
                    const createdLabel = {labels: [['span1', color.colors[0]]]}
                    assert.deepStrictEqual(createdLabelList['span'], createdLabel)
                })
                it('should set label `relation1` for other of `span` label type', function () {
                    const createdLabelList = db.saveLabelList.firstCall.args[0]
                    const createdLabel = {labels: [['relation1', color.colors[0]]]}
                    assert.deepStrictEqual(createdLabelList['one-way'], createdLabel)
                    assert.deepStrictEqual(createdLabelList['two-way'],  createdLabel)
                    assert.deepStrictEqual(createdLabelList['link'],  createdLabel)
                })
            })

            context('when `.js-label-tab` is `span`, and `one-way`', function () {
                beforeEach(function () {
                    this.tabs = createLabelGui(['span', 'one-way'])
                    document.body.appendChild(this.tabs)
                    behavior.setup( () => { }, () => { })
                })
                afterEach(function () {
                    db.getLabelList.resetHistory()
                    db.saveLabelList.resetHistory()
                    document.body.removeChild(this.tabs)
                })

                it('should create label type for `span`, and `one-way`', function () {
                    const createdLabelList = db.saveLabelList.firstCall.args[0]
                    assert.strictEqual(Object.keys(createdLabelList).length, 2)
                    assert.ok(createdLabelList['span'])
                    assert.ok(createdLabelList['one-way'])
                })
                it('should set label `span1` for `span` label type', function () {
                    const createdLabelList = db.saveLabelList.firstCall.args[0]
                    assert.deepStrictEqual(createdLabelList['span'], {labels: [['span1', color.colors[0]]]})
                })
                it('should set label `relation1` for `one-way` label type', function () {
                    const createdLabelList = db.saveLabelList.firstCall.args[0]
                    assert.deepStrictEqual(createdLabelList['one-way'], {labels: [['relation1', color.colors[0]]]})
                })
            })
        })

        context('when labelList in DB is not empty', function () {
            beforeEach(function () {
                this.theLabelList = {
                    'span': { labels: [ ['SPAN10', '#fff'] ] }
                }
                db.getLabelList.returns(this.theLabelList)

                this.tabs = createLabelGui(['span'])
                document.body.appendChild(this.tabs)

                behavior.setup( () => { }, () => { })
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
