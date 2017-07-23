/**
 * UI parts - Input Label.
 */

 let $inputLabel;
 window.addEventListener('DOMContentLoaded', () => {
    $inputLabel = $('#inputLabel');
 });

let _blurListener;

let currentUUID;

let _getSelectedAnnotations;
let _saveAnnotationText;

export function setup({ getSelectedAnnotations, saveAnnotationText }) {

    _getSelectedAnnotations = getSelectedAnnotations;
    _saveAnnotationText = saveAnnotationText;

    // set datalist.
    setDatalist();

    // set actions.
    setupActions();

    // Start to listen window events.
    listenWindowEvents();

    setupLabelAddButton();

    setupLabelTrashButton();

    seupTabClick();
}

let currentTab = 'span';

function seupTabClick() {

    $('.js-label-tab').on('click', e => {

        const type = $(e.currentTarget).data('type');
        console.log(type);
        const labels = ['&nbsp;'].concat(getLabelListData()[type] || []);

        currentTab = type;

        let $ul = $(`<ul class="tab-pane active label-list" data-type="${type}"/>`);
        labels.forEach((label, index) => {
            if (index === 0) {
                $ul.append(`
                    <li>
                        <div class="label-list__btn no-action"></div>
                        <div class="label-list__text">${label}</div>
                    </li>
                `);
            } else {
                $ul.append(`
                    <li>
                        <div class="label-list__btn js-label-trash" data-index="${index}"><i class="fa fa-trash-o"></i></div>
                        <div class="label-list__text">${label}</div>
                    </li>
                `);
            }
        });
        $ul.append(`
            <li>
                <div class="label-list__btn js-add-label-button"><i class="fa fa-plus"></i></div>
                <input type="text" class="label-list__input">
            </li>
        `);
        $('.js-label-tab-content').html($ul);
    });

    $('.js-label-tab[data-type="span"]').click();
}

const LSKEY_LABEL_LIST = 'pdfanno-label-list';


function setupLabelAddButton() {

    $('.js-label-tab-content').on('click', '.js-add-label-button', e => {

        const
            $this = $(e.currentTarget),
            text = $this.parent().find('input').val(),
            type = $this.parents('[data-type]').data('type');

        // No action for no input.
        if (!text) {
            return;
        }

        console.log(text, type);

        let d = getLabelListData();
        let labels = d[type] || [];
        labels.push(text);
        d[type] = labels;
        saveLabelListData(d);

        // Re-render.
        $(`.js-label-tab[data-type="${currentTab}"]`).click();
    });
}

function setupLabelTrashButton() {

    $('.js-label-tab-content').on('click', '.js-label-trash', e => {

        const
            $this = $(e.currentTarget),
            idx   = $this.data('index') - 1,
            type  = $this.parents('[data-type]').data('type');

        let d = getLabelListData();
        let labels = d[type];
        labels = labels.slice(0, idx).concat(labels.slice(idx+1, labels.length));
        d[type] = labels;
        saveLabelListData(d);

        // Re-render.
        $(`.js-label-tab[data-type="${currentTab}"]`).click();

    });

}

function getLabelListData() {
    return JSON.parse(localStorage.getItem(LSKEY_LABEL_LIST) || '{}');
}

function saveLabelListData(data) {
    localStorage.setItem(LSKEY_LABEL_LIST, JSON.stringify(data));
}
















export function enable({ uuid, text, disable=false, autoFocus=false, blurListener=null }) {
    console.log('enableInputLabel:', uuid, text);

    currentUUID = uuid;

    if (_blurListener) {
        _blurListener();
        _blurListener = null;
        console.log('old _blurListener is called.');
    }


    $inputLabel
        .attr('disabled', 'disabled')
        .val(text || '')
        .off('blur')
        .off('keyup');

    if (disable === false) {
        $inputLabel
            .removeAttr('disabled')
            .on('keyup', () => {
                saveText(uuid);
            });
    }

    if (autoFocus) {
        $inputLabel.focus();
    }

    $inputLabel.on('blur', () => {

        if (blurListener) {
            blurListener();
            _blurListener = blurListener;
        }

        saveText(uuid);
    });

};

export function disable() {
    console.log('disableInputLabel');

    currentUUID = null;

    $inputLabel
        .attr('disabled', 'disabled')
        .val('');
}

function treatAnnotationDeleted({ uuid }) {
    console.log('treatAnnotationDeleted:', uuid);

    if (currentUUID === uuid) {
        disable(...arguments);
    }
}

function handleAnnotationHoverIn(annotation) {
    if (_getSelectedAnnotations().length === 0) {
        enable({ uuid : annotation.uuid, text : annotation.text, disable : true });
    }
}

function handleAnnotationHoverOut(annotation) {
    if (_getSelectedAnnotations().length === 0) {
        disable();
    }
}

function handleAnnotationSelected(annotation) {
    if (_getSelectedAnnotations().length === 1) {
        enable({ uuid : annotation.uuid, text : annotation.text });
    } else {
        disable();
    }
}

function handleAnnotationDeselected() {
    const annos = _getSelectedAnnotations();
    if (annos.length === 1) {
        enable({ uuid : annos[0].uuid, text : annos[0].text });
    } else {
        disable();
    }
}

function saveText(uuid) {

    const text = $inputLabel.val() || '';

    _saveAnnotationText(uuid, text);
}

/**
 * Local storage key for datalist.
 */
const LSKEY_DATALIST = '_pdfanno_datalist';

function setDatalist() {

    // set datalist.
    let datalist = JSON.parse(localStorage.getItem(LSKEY_DATALIST) || '[]');
    const options = datalist.map(d => {
        return `<option value="${d}"></option>`;
    });
    $('#labels').html(options);
}

function setupActions() {
    // Setup datalist modal.
    $('#datalistModal').off().on('show.bs.modal', e => {

        // datalist.
        let datalist = JSON.parse(localStorage.getItem(LSKEY_DATALIST) || '[]');

        // input for new.
        datalist.push('');

        const snipets = datalist.map(d => {
            return `
            <li class="list-group-item">
                <input class="form-control js-input" value="${d}">
                <span class="glyphicon glyphicon-remove js-delete"></span>
            </li>
            `;
        });

        $('#datalistModal .js-datalist').html(snipets.join(''));

    });

    $('#datalistModal').on('keyup', '.js-input', e => {

        const $this = $(e.currentTarget);
        const val = $this.val();
        const isEnd = $this.parent().is(':last-child');

        if (isEnd && val && val.length > 0) {
            $('#datalistModal .js-datalist').append(`
                <li class="list-group-item">
                    <input class="form-control js-input" value="">
                    <span class="glyphicon glyphicon-remove js-delete"></span>
                </li>
            `);
        }
    });

    $('#datalistModal').on('click', '.js-delete', e => {
        $(e.currentTarget).parent().remove();
    });

    $('#datalistModal .js-done').on('click', e => {

        let datalist = [];
        $('#datalistModal .js-datalist .js-input').each(function() {
            const val = $(this).val();
            if (val && val.length > 0) {
                datalist.push(val);
            }
        });

        localStorage.setItem(LSKEY_DATALIST, JSON.stringify(datalist));

        setDatalist();

        $('#datalistModal').modal('hide');
    });
}


function listenWindowEvents() {

    // enable text input.
    window.addEventListener('enableTextInput', e => {
        console.log('enableTextInput:', e.detail);
        enable(e.detail);
    });

    // disable text input.
    window.addEventListener('disappearTextInput', e => {
        console.log('disappearTextInput:', e.detail);
        disable(e.detail);
    });

    // handle annotation deleted.
    window.addEventListener('annotationDeleted', e => {
        treatAnnotationDeleted(e.detail);
    });

    // handle annotation hoverIn.
    window.addEventListener('annotationHoverIn' , e => {
        handleAnnotationHoverIn(e.detail);
    });

    // handle annotation hoverOut.
    window.addEventListener('annotationHoverOut' , e => {
        handleAnnotationHoverOut(e.detail);
    });

    // handle annotation selected.
    window.addEventListener('annotationSelected' , e => {
        handleAnnotationSelected(e.detail);
    });

    // handle annotation deselected.
    window.addEventListener('annotationDeselected' , () => {
        handleAnnotationDeselected();
    });
}
