import assert from 'assert'

import toml from 'toml'
import * as annoUtils from '../../../src/utils'

// Test target
import labelInputReader from '../../../src/components/labelInput/reader.js'

const validLabelInputData = [
    '[[span]]',
    'label = "span1"',
    'color = "#FF0000"',
    '[[span]]',
    'label = "span2"',
    'color = "#00FF00"',
    '[[span]]',
    'label = "span3"',
    'color = "#0000FF"',
    '[[relation]]',
    'label = "oneway-relation1"',
    'color = "#FFFF00"',
].join("\n")

const invalidLabelInputData = [
    '[[span]]',
    'label = "span1"',
    'color = "#FF0000"',
    '[[one-way]]',
    'label = "span3"',
    'color = "#0000FF"',
    '[[relation]]',
    'label = "oneway-relation1"',
    'color = "#00FF00"',
].join("\n")

const emptyData = ''

describe('labelInput/Reader', () => {
    before(function () {
        this.validFileObj   = new Blob([validLabelInputData], {type: 'text/plain'})
        this.invalidFileObj = new Blob([invalidLabelInputData], {type: 'text/plain'})
        this.emptyFileObj   = new Blob([emptyData], {type: 'text/plain'})
    })

    context('read the valid data from valid fileObj', function () {
        it('should return a Promise.resolve(labelData)', function (done) {
            const result = labelInputReader(this.validFileObj)

            assert.ok(result instanceof Promise)
            result.then((resolve) => {
                assert.deepStrictEqual(annoUtils.toml2object(validLabelInputData), resolve)
                done()
            })
        })

        it('should include "span" and "relation" in labelData', async function () {
            const labelData = await labelInputReader(this.validFileObj)
            assert.strictEqual(2, Object.keys(labelData).length)
            assert(labelData['span'])
            assert(labelData['relation'])
        })

        it('should include "labels" in labelData.span, and includes 3 label in labelData.span.labels', async function () {
            const labelData = await labelInputReader(this.validFileObj)
            assert(labelData['span'].labels)
            assert.strictEqual(3, labelData['span'].labels.length, 3)
            assert.deepStrictEqual(
                [
                    ['span1', '#FF0000'], ['span2', '#00FF00'], ['span3', '#0000FF']
                ], labelData['span'].labels
            )
        })

        it('should include "labels" in labelData["relation"], and includes 1 label in labelData["relation"].labels', async function () {
            const labelData = await labelInputReader(this.validFileObj)
            assert(labelData['relation'].labels)
            assert.strictEqual(1, labelData['relation'].labels.length)
            assert.deepStrictEqual([['oneway-relation1', '#FFFF00']], labelData['relation'].labels)
        })
    })

    context('read the empty data from valid fileObj', function () {
        it('should throw TypeError("Empty data")', async function () {
            try {
                const result = await labelInputReader(this.emptyFileObj)
                assert.fail()
            } catch(error) {
                assert.ok(error instanceof TypeError)
                assert.strictEqual('Empty data', error.message)
            }
        })
    })

    context('read from invalid FileObj', function () {
        it('should throw Error', async function () {
            try {
                const result = await labelInputReader({})
                assert.fail()
            } catch(error) {
                assert.ok(error instanceof Error)
            }  
        })
    })
})
