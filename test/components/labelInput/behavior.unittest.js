import assert from 'assert'

// Test target
import labelInputBehavior from '../../../src/components/labelInput/behavior.js'

describe('labelInput/Behavior', () => {
    context('setup', () => {
        it('should set a listener to `.js-label-tab` click event', () => {
            assert.fail()
        })
        it('should set the ColorPicker to `.js-label-palette`', () => {
            assert.fail()
        })
        it('should set a listener to `.js-add-label-button` click event', () => {
            assert.fail()
        })
        it('should set a listener to `.js-label-trush` click event', () => {
            assert.fail()
        })
        it('should set a listener to `.js-label` click event', () => {
            assert.fail()
        })
        it('should set a listener to `.js-export-label` click event', () => {
            assert.fail()
        })

        it('should set a listener to `.js-import-label` click event', () => {
            assert.fail()
        })

        it('should set a listener to `.js-import-file` change event', () => {
            assert.fail()
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

    context('`.js-label-tab` click event listener', () => {
        it('', () => {
            assert.fail()
        })
    })

    context('`.js-add-label-button` click event listener', () => {
        it('', () => {
            assert.fail()
        })
    })

    context('`.js-label-trush` click event listener', () => {
        it('', () => {
            assert.fail()
        })
    })

    context('`.js-label` click event listener', () => {
        it('', () => {
            assert.fail()
        })
    })

    context('`.js-export-label` click event listener', () => {
        it('', () => {
            assert.fail()
        })
    })

    context('`.js-import-label` click event listener', () => {
        it('', () => {
            assert.fail()
        })
    })

    context('`.js-import-file` change event listener', () => {
        it('', () => {
            assert.fail()
        })
    })
})
