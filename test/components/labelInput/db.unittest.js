import assert from 'assert'

// for stub
import * as annoUiCore from '../../../src/core'

// Test target
import * as db from '../../../src/components/labelInput/db'

describe('label list db', () => {
    before(function () {
        this.applicationName = 'labellist-db-test-' + (new Date()).getTime()

        annoUiCore.setup({applicationName: this.applicationName})
    })

    context('getLabelList', function () {
        beforeEach(() => {
            localStorage.removeItem(this.applicationName + '-label-list')
        })
        afterEach(() => {
            localStorage.removeItem(this.applicationName + '-label-list')
        })
        
        context('when db is empty', () => {
            it('should return empty Object', () => {
                assert.deepStrictEqual(db.getLabelList(), {})
            })
        })

        context('when db has some label', function () {
            beforeEach(function () {
                this.labelList = {
                    'span': { // annotation type
                        labels: [
                            ['span1', '#f1f'], // each labelObj (label, color)
                            ['span2', '#ff1'], // each labelObj (label, color)
                        ]
                    },
                    'one-way': {
                        labels: [ ['relation1', '#1ff'], ['relation2', '#fff'] ]
                    }
                }
                localStorage.setItem(this.applicationName + '-label-list', JSON.stringify(this.labelList))
            })

            it('should return all label', function () {
                assert.deepStrictEqual(db.getLabelList(), this.labelList)
            })
        })
    })

    context('setLabellist()', () => {
        beforeEach(function () {
            this.labelList = {
                'span': { // annotation type
                    labels: [
                        ['span1', '#f1f'], // each labelObj (label, color)
                        ['span2', '#ff1'], // each labelObj (label, color)
                    ]
                },
                'one-way': {
                    labels: [ ['relation1', '#1ff'], ['relation2', '#fff'] ]
                }
            }
        })
      
        it('should store the argument that is stringified  to localStorage', function () {
            db.saveLabelList(this.labelList)

            assert.deepStrictEqual(
                localStorage.getItem(this.applicationName + '-label-list'),
                JSON.stringify(this.labelList)
            )
        })
    })

    context('findLabel()', () => {
        beforeEach(function () {
            this.labelList = {
                'span': { // annotation type
                    labels: [
                        ['span1', '#f1f'], // each labelObj (label, color)
                        ['span2', '#ff1'], // each labelObj (label, color)
                    ]
                },
                'one-way': {
                    labels: [ ['relation1', '#1ff'], ['relation2', '#fff'] ]
                }
            }
            db.saveLabelList(this.labelList)
        })

        context('when target label exists in localStorage', function () {
            it('should return labelObject(lable, color)', function () {
                assert.deepStrictEqual(db.findLabel('span', 'span2'), this.labelList['span'].labels[1])
            })
        })

        context('when target label does not exist in localStorage', function () {
            it('should return undefined', function () {
                assert.strictEqual(db.findLabel('one-way', 'span2'), undefined)
            })
        })
    })
})
