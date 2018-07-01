import assert from 'assert'

import toml from 'toml'

// Test target
import labelInputReader from '../../../src/components/labelInput/behavior/reader.js'

const validLabelInputData = [
    '[span]',
    'labels = [["span1", "#FF0000"], ["span2", "#00FF00"], ["span3", "#0000FF"]]',
    '[one-way]',
    'labels = [["oneway-relation1", "#FFFF00"]]',
    '[two-way]',
    'labels = [["twoway-relation1", "#00FFFF"]]',
    '[link]',
    'labels = [["link-relation1", "#FF00FF"]]'
].join("\n")

const invalidLabelInputData = [
    '[span]',
    'labels = [["span1", "#FF0000"], ["span2", "#00FF00"], ["span3", "#0000FF"]]',
    '[one-way]',
    'labels = [["oneway-relation1", "#FFFF00"]]',
    '[three-way]',
    'labels = [["threeway-relation1", "#00FFFF"]]',
    '[link]',
    'labels = [["link-relation1", "#FF00FF"]]'
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
                assert.deepStrictEqual(toml.parse(validLabelInputData), resolve)
                done()
            })
        })

        it('should include "span", "one-way", "two-way", and "link" in labelData', async function () {
            const labelData = await labelInputReader(this.validFileObj)
            assert.strictEqual(4, Object.keys(labelData).length)
            assert(labelData['span'])
            assert(labelData['one-way'])
            assert(labelData['two-way'])
            assert(labelData['link'])
        })

        it('should include "labels" in labelData.span, and includes 3 label in labelData.span.labels', async function () {
            const labelData = await labelInputReader(this.validFileObj)
            assert(labelData['span'].labels)
            assert.strictEqual(3, labelData['span'].labels.length)
            assert.deepStrictEqual(
                [
                    ['span1', '#FF0000'], ['span2', '#00FF00'], ['span3', '#0000FF']
                ], labelData['span'].labels
            )
        })

        it('should include "labels" in labelData["one-way"], and includes 1 label in labelData["one-way"].labels', async function () {
            const labelData = await labelInputReader(this.validFileObj)
            assert(labelData['one-way'].labels)
            assert.strictEqual(1, labelData['one-way'].labels.length)
            assert.deepStrictEqual([['oneway-relation1', '#FFFF00']], labelData['one-way'].labels)
        })

        it('should include "labels" in labelData["two-way"], and includes 1 label in labelData["two-way"].labels', async function () {
            const labelData = await labelInputReader(this.validFileObj)
            assert(labelData['two-way'].labels)
            assert.strictEqual(1, labelData['two-way'].labels.length)
            assert.deepStrictEqual([['twoway-relation1', '#00FFFF']], labelData['two-way'].labels)
        })

        it('should include "labels" in labelData.link, and includes 1 label in labelData.link.labels', async function () {
            const labelData = await labelInputReader(this.validFileObj)
            assert(labelData['link'].labels)
            assert.strictEqual(1, labelData['link'].labels.length)
            assert.deepStrictEqual([['link-relation1', '#FF00FF']], labelData['link'].labels)
        })
    })

    context('read the invalid data from valid fileObj', function () {
        it('should throw TypeError("Invalid label type;")', async function () {
            try {
                const result = await labelInputReader(this.invalidFileObj)
                assert.fail()
            } catch(error) {
                assert.ok(error instanceof TypeError)
                assert.strictEqual('Invalid label type; three-way', error.message)
            }
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
