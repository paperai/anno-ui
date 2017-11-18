/**
 * Define the behaviors of label input component.
 */
import toml from 'toml'
import * as alertDialog from '../../uis/alertDialog'
import * as annoUtils from '../../utils'
import * as db from './db'
import * as core from './core'

// The tab selected.
let currentTab = 'span'

/**
 * Setup the behaviors for Input Label.
 */
export function setup (createSpanAnnotation, createRelAnnotation) {

    // Set add button behavior.
    setupLabelAddButton()

    // Set trash button behavior.
    setupLabelTrashButton()

    // Set the action when a label is clicked.
    setupLabelText(createSpanAnnotation, createRelAnnotation)

    // Set tab behavior.
    setupTabClick()

    // Set import/export link behavior.
    setupImportExportLink()
}

/**
 * Setup the tab behavior.
 */
function setupTabClick () {
    $('.js-label-tab').on('click', e => {
        const type = $(e.currentTarget).data('type')
        let d = db.getLabelList()
        const labelObject = d[type] || {}
        let labels
        if (labelObject.labels === undefined) {
            labels = [(type === 'span' ? 'span1' : 'relation1')]
        } else {
            labels = labelObject.labels
        }

        labelObject.labels = labels
        d[type] = labelObject
        db.saveLabelList(d)

        currentTab = type

        let $ul = $(`<ul class="tab-pane active label-list" data-type="${type}"/>`)
        labels.forEach((label, index) => {
            $ul.append(`
                <li>
                    <div class="label-list__btn js-label-trash" data-index="${index}"><i class="fa fa-trash-o fa-2x"></i></div>
                    <div class="label-list__text js-label">${label}</div>
                </li>
            `)
        })
        $ul.append(`
            <li>
                <div class="label-list__btn js-add-label-button"><i class="fa fa-plus fa-2x"></i></div>
                <input type="text" class="label-list__input">
            </li>
        `)
        $('.js-label-tab-content').html($ul)
    })

    // Setup the initial tab content.
    $('.js-label-tab[data-type="span"]').click()
}

/**
 * Set the add button behavior.
 */
function setupLabelAddButton () {
    $('.js-label-tab-content').on('click', '.js-add-label-button', e => {
        let $this = $(e.currentTarget)
        let text = $this.parent().find('input').val()
        let type = $this.parents('[data-type]').data('type')

        // Check the text valid.
        if (!core.isValidInput(text)) {
            alertDialog.show({ message : 'Nor white space, tab, or line break are not permitted.' })
            return
        }

        let d = db.getLabelList()
        let labelObject = d[type] || { labels : [] }
        labelObject.labels.push(text)
        d[type] = labelObject
        db.saveLabelList(d)

        // Re-render.
        $(`.js-label-tab[data-type="${currentTab}"]`).click()
    })
}

/**
 * Set the trash button behavior.
 */
function setupLabelTrashButton () {
    $('.js-label-tab-content').on('click', '.js-label-trash', e => {
        const $this = $(e.currentTarget)
        const idx = $this.data('index')
        const type = $this.parents('[data-type]').data('type')

        let d = db.getLabelList()
        let labelObject = d[type] || { labels : [] }
        labelObject.labels = labelObject.labels.slice(0, idx).concat(labelObject.labels.slice(idx + 1, labelObject.labels.length))
        d[type] = labelObject
        db.saveLabelList(d)

        // Re-render.
        $(`.js-label-tab[data-type="${currentTab}"]`).click()
    })
}

/**
 * Set the behavior which a label text is clicked.
 */
function setupLabelText (createSpanAnnotation, createRelAnnotation) {
    $('.js-label-tab-content').on('click', '.js-label', e => {
        let $this = $(e.currentTarget)
        let text = $this.text().trim().replace(/&nbsp;/g, '')
        let type = $this.parents('[data-type]').data('type')
        if (type === 'span') {
            createSpanAnnotation({ text })
        } else if (type === 'one-way' || type === 'two-way' || type === 'link') {
            createRelAnnotation({ type, text })
        }
    })
}

/**
 * Set the behavior of importing/exporting label settings.
 */
function setupImportExportLink () {
    $('.js-export-label').on('click', () => {
        let data = db.getLabelList()

        // Transform '&nbsp;' to white space.
        Object.keys(data).forEach(key => {
            let labelObject = data[key]
            let labels = (labelObject.labels || []).map(label => {
                if (label === '&nbsp;') {
                    label = ''
                }
                return label
            })
            labelObject.labels = labels
        })

        // Conver to TOML style.
        const toml = annoUtils.tomlString(data)

        // Download.
        annoUtils.download('pdfanno.conf', toml)
    })

    $('.js-import-label').on('click', () => {
        $('.js-import-file').val(null).click()
    })
    $('.js-import-file').on('change', ev => {
        if (ev.target.files.length === 0) {
            return
        }

        const file = ev.target.files[0]

        if (!window.confirm('Are you sure to load labels?')) {
            return
        }

        let fileReader = new FileReader()
        fileReader.onload = event => {
            const tomlString = event.target.result
            try {
                const labelData = toml.parse(tomlString)

                // whitespace to '&nbsp'
                Object.keys(labelData).forEach(key => {
                    let labelObject = labelData[key]
                    let labels = (labelObject.labels || []).map(label => {
                        if (label === '') {
                            label = '&nbsp;'
                        }
                        return label
                    })
                    labelObject.labels = labels
                })

                db.saveLabelList(labelData)
                // Re-render.
                $(`.js-label-tab[data-type="${currentTab}"]`).click()
            } catch (e) {
                console.log('ERROR:', e)
                console.log('TOML:\n', tomlString)
                alertDialog.show({ message : 'ERROR: cannot load the label file.' })
                return
            }
        }
        fileReader.readAsText(file)
    })
}
