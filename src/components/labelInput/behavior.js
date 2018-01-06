/**
 * Define the behaviors of label input component.
 */
import toml from 'toml'
import * as alertDialog from '../../uis/alertDialog'
import * as annoUtils from '../../utils'
import * as db from './db'
import * as core from './core'
import * as color from './color'

/**
 * The selected tab.
 */
// let currentTab = 'span'

/**
 * Colors for a picker.
 */
const colors = [
    // pick from https://www.materialui.co/colors.
    '#FFEB3B', // yellow
    '#FF5722', // orange
    '#795548', // brown
    '#F44336', // red
    '#E91E63', // pink
    '#9C27B0', // purple
    '#3F51B5', // blue
    '#4CAF50'  // green
]

/**
 * Setup the behaviors for Input Label.
 */
export function setup (createSpanAnnotation, createRelAnnotation) {

    core.setCurrentTab('span')

    // Set add button behavior.
    setupAddButton()

    // Set trash button behavior.
    setupTrashButton()

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
            const text = type === 'span' ? 'span1' : 'relation1'
            labels = [ [ text, color.colors[0] ] ]
        } else {
            labels = labelObject.labels
        }

        labelObject.labels = labels
        d[type] = labelObject
        db.saveLabelList(d)

        // currentTab = type
        core.setCurrentTab(type)

        let $ul = $(`<ul class="tab-pane active label-list" data-type="${type}"/>`)
        labels.forEach((label, index) => {

            let text, aColor
            if (typeof label === 'string') { // old style.
                text = label
                aColor = color.colors[0]
            } else {
                text = label[0]
                aColor = label[1]
            }

            $ul.append(`
                <li class="label-list__item">
                    <div class="label-list__btn js-label-trash" data-index="${index}">
                        <i class="fa fa-trash-o fa-2x"></i>
                    </div>
                    <input type="text" name="color" class="js-label-palette" autocomplete="off" data-color="${aColor}" data-index="${index}">
                    <div class="label-list__text js-label">
                        ${text}
                    </div>
                </li>
            `)
        })
        $ul.append(`
            <li class="label-list__item">
                <div class="label-list__btn js-add-label-button">
                    <i class="fa fa-plus fa-2x"></i>
                </div>
                <input type="text" class="label-list__input">
            </li>
        `)
        $('.js-label-tab-content').html($ul)

        // Setup color pickers.
        setupColorPicker()

    })

    // Setup the initial tab content.
    $('.js-label-tab[data-type="span"]').click()
}

/**
 * Setup the color pickers.
 */
function setupColorPicker () {

    // Setup colorPickers.
    $('.js-label-palette').spectrum({
        showPaletteOnly        : true,
        showPalette            : true,
        hideAfterPaletteSelect : true,
        palette                : color.getPaletteColors()
    })
    // Set initial color.
    $('.js-label-palette').each((i, elm) => {
        const $elm = $(elm)
        $elm.spectrum('set', $elm.data('color'))
    })

    // Setup behavior.
    // Save the color to db, and notify.
    $('.js-label-palette').off('change').on('change', (e) => {
        const $this = $(e.currentTarget)
        const aColor = $this.spectrum('get').toHexString()
        const index = $this.data('index')
        console.log('click color picker:', e, aColor, index)

        let labelList = db.getLabelList()
        let label = labelList[core.getCurrentTab()].labels[index]
        if (typeof label === 'string') { // old style.
            label = [ label, aColor ]
        } else {
            label[1] = aColor
        }
        labelList[core.getCurrentTab()].labels[index] = label
        db.saveLabelList(labelList)

        // Notify color changed.
        const text = $this.siblings('.js-label').text().trim()
        color.notifyColorChanged({ text : text, color : aColor, annoType : core.getCurrentTab() })
    })
}

/**
 * Set the add button behavior.
 */
function setupAddButton () {
    $('.js-label-tab-content').on('click', '.js-add-label-button', e => {
        let $this = $(e.currentTarget)

        let text = $this.parent().find('input').val()
        let type = $this.parents('[data-type]').data('type')

        // Check the text valid.
        if (!core.isValidInput(text)) {
            alertDialog.show({ message : 'Nor white space, tab, or line break are not permitted.' })
            return
        }

        // Chose one at random.
        let aColor = color.choice()

        let d = db.getLabelList()
        let labelObject = d[type] || { labels : [] }
        labelObject.labels.push([ text, aColor ])
        d[type] = labelObject
        db.saveLabelList(d)

        // Re-render.
        $(`.js-label-tab[data-type="${core.getCurrentTab()}"]`).click()
    })
}

/**
 * Set the trash button behavior.
 */
function setupTrashButton () {
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
        $(`.js-label-tab[data-type="${core.getCurrentTab()}"]`).click()
    })
}

/**
 * Set the behavior which a label text is clicked.
 */
function setupLabelText (createSpanAnnotation, createRelAnnotation) {
    $('.js-label-tab-content').on('click', '.js-label', e => {
        let $this = $(e.currentTarget)
        let text = $this.text().trim()
        let type = $this.parents('[data-type]').data('type')
        let color = $this.parent().find('.js-label-palette').spectrum('get').toHexString()
        console.log('add:', color)
        if (type === 'span') {
            createSpanAnnotation({ text, color })
        } else if (type === 'one-way' || type === 'two-way' || type === 'link') {
            createRelAnnotation({ type, text, color })
        }
    })
}

/**
 * Set the behavior of importing/exporting label settings.
 */
function setupImportExportLink () {

    // Export behavior.
    $('.js-export-label').on('click', () => {
        let data = db.getLabelList()

        // Conver to TOML style.
        const toml = annoUtils.tomlString(data)

        // Download.
        annoUtils.download('pdfanno.conf', toml)
    })

    // Import behavior.
    $('.js-import-label').on('click', () => {
        $('.js-import-file').val(null).click()
    })
    $('.js-import-file').on('change', async ev => {

        if (ev.target.files.length === 0) {
            return
        }

        if (!window.confirm('Are you sure to load labels?')) {
            return
        }

        try {
            const file = ev.target.files[0]
            const tomlString = await annoUtils.loadFileAsText(file)
            const labelData = toml.parse(tomlString)
            db.saveLabelList(labelData)
            // Re-render.
            $(`.js-label-tab[data-type="${core.getCurrentTab()}"]`).click()

        } catch (e) {
            console.log('ERROR:', e)
            alertDialog.show({ message : 'ERROR: cannot load the label file.' })
            return
        }

    })
}
