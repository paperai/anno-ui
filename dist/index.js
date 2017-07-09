(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["annoUI"] = factory();
	else
		root["annoUI"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_browseButton__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_contentDropdown__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_primaryAnnoDropdown__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_referenceAnnoDropdown__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_annoListDropdown__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_downloadButton__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_annoRectButton__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_annoRelButton__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_annoSpanButton__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_labelInput__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_uploadButton__ = __webpack_require__(11);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "browseButton", function() { return __WEBPACK_IMPORTED_MODULE_0__components_browseButton__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "contentDropdown", function() { return __WEBPACK_IMPORTED_MODULE_1__components_contentDropdown__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "primaryAnnoDropdown", function() { return __WEBPACK_IMPORTED_MODULE_2__components_primaryAnnoDropdown__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "referenceAnnoDropdown", function() { return __WEBPACK_IMPORTED_MODULE_3__components_referenceAnnoDropdown__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "annoListDropdown", function() { return __WEBPACK_IMPORTED_MODULE_4__components_annoListDropdown__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "downloadButton", function() { return __WEBPACK_IMPORTED_MODULE_5__components_downloadButton__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "annoRectButton", function() { return __WEBPACK_IMPORTED_MODULE_6__components_annoRectButton__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "annoRelButton", function() { return __WEBPACK_IMPORTED_MODULE_7__components_annoRelButton__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "annoSpanButton", function() { return __WEBPACK_IMPORTED_MODULE_8__components_annoSpanButton__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "labelInput", function() { return __WEBPACK_IMPORTED_MODULE_9__components_labelInput__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "uploadButton", function() { return __WEBPACK_IMPORTED_MODULE_10__components_uploadButton__; });



















/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setupColorPicker"] = setupColorPicker;
/* harmony export (immutable) */ __webpack_exports__["setup"] = setup;
/**
 * UI parts - Browse button.
 */

/**
 * Setup the color pickers.
 */
function setupColorPicker() {

    const colors = [
        'rgb(255, 128, 0)', 'hsv 100 70 50', 'yellow', 'blanchedalmond',
        'red', 'green', 'blue', 'violet'
    ];

    // Setup colorPickers.
    $('.js-anno-palette').spectrum({
        showPaletteOnly        : true,
        showPalette            : true,
        hideAfterPaletteSelect : true,
        palette                : [
            colors.slice(0, Math.floor(colors.length/2)),
            colors.slice(Math.floor(colors.length/2), colors.length)
        ]
    });
    // Set initial color.
    $('.js-anno-palette').each((i, elm) => {
        $(elm).spectrum('set', colors[ i % colors.length ]);
    });

    // Setup behavior.
    $('.js-anno-palette').off('change').on('change', _displayCurrentReferenceAnnotations);
}

// TODO この辺は、pdfannoのせいでかなり複雑なので、なんとかしたいなー.
let _loadFiles;
let _clearAllAnnotations;
let _displayCurrentReferenceAnnotations;
let _displayCurrentPrimaryAnnotations;
let _getContentFiles;
let _getAnnoFiles;
let _closePDFViewer;

/**
 * Setup the behavior of a Browse Button.
 */
function setup({ 
        loadFiles,
        clearAllAnnotations,
        displayCurrentReferenceAnnotations,
        displayCurrentPrimaryAnnotations,
        getContentFiles,
        getAnnoFiles,
        closePDFViewer,
    }) {

    _loadFiles = loadFiles;
    _clearAllAnnotations = clearAllAnnotations;
    _displayCurrentReferenceAnnotations = displayCurrentReferenceAnnotations;
    _displayCurrentPrimaryAnnotations = displayCurrentPrimaryAnnotations;
    _getContentFiles = getContentFiles,
    _getAnnoFiles = getAnnoFiles;
    _closePDFViewer = closePDFViewer;

    // Enable to select the same directory twice or more.
    $('.js-file :file').on('click', ev => {
        $('input[type="file"]').val(null);
    });

    $('.js-file :file').on('change', ev => {

        const files = ev.target.files;

        let error = isValidDirectorySelect(files);
        if (error) {
            return alert(error);
        }

        loadFiles(files).then(() => {

            // Get current visuals.
            const current = getCurrentFileNames();

            // Initialize PDF Viewer.
            clearAllAnnotations();

            // Setup PDF Dropdown.
            setPDFDropdownList();

            // Setup Anno Dropdown.
            setAnnoDropdownList();

            // Display a PDF and annotations.
            restoreBeforeState(current);

        });

    });
}

/**
 * Check whether the directory the user specified is valid.
 */
function isValidDirectorySelect(files) {

    // Error, if no contents exits.
    if (!files || files.length === 0) {
        return 'Not files specified';
    }

    // Error, if the user select a file - not a directory.
    let relativePath = files[0].webkitRelativePath;
    if (!relativePath) {
        return 'Please select a directory, NOT a file';
    }

    // OK.
    return null;
}

/**
 * Restore the state before Browse button was clicked.
 */
function restoreBeforeState(currentDisplay) {

    let files;

    let isPDFClosed = false;

    // Restore the check state of a content.
    files = _getContentFiles().filter(c => c.name === currentDisplay.pdfName);
    if (files.length > 0) {
        $('#dropdownPdf .js-text').text(files[0].name);
        $('#dropdownPdf a').each((index, element) => {
            let $elm = $(element);
            if ($elm.find('.js-content-name').text() === currentDisplay.pdfName) {
                $elm.find('.fa-check').removeClass('no-visible');
            }
        });

    } else {

        isPDFClosed = true;

        _closePDFViewer();
    }

    // Restore the check state of a primaryAnno.
    files = _getAnnoFiles().filter(c => c.name === currentDisplay.primaryAnnotationName);
    if (files.length > 0 && isPDFClosed === false) {
        $('#dropdownAnnoPrimary .js-text').text(currentDisplay.primaryAnnotationName);
        $('#dropdownAnnoPrimary a').each((index, element) => {
            let $elm = $(element);
            if ($elm.find('.js-annoname').text() === currentDisplay.primaryAnnotationName) {
                $elm.find('.fa-check').removeClass('no-visible');
            }
        });
        setTimeout(() => {
            _displayCurrentPrimaryAnnotations();
        }, 100);
    }

    // Restore the check states of referenceAnnos.
    let names = currentDisplay.referenceAnnotationNames;
    let colors = currentDisplay.referenceAnnotationColors;
    names = names.filter((name, i) => {
        let found = false;
        let annos = _getAnnoFiles().filter(c => c.name === name);
        if (annos.length > 0) {
            $('#dropdownAnnoReference a').each((index, element) => {
                let $elm = $(element);
                if ($elm.find('.js-annoname').text() === name) {
                    $elm.find('.fa-check').removeClass('no-visible');
                    $elm.find('.js-anno-palette').spectrum('set', colors[i]);
                    found = true;
                }
            });
        }
        return found;
    });

    if (names.length > 0 && isPDFClosed === false) {
        $('#dropdownAnnoReference .js-text').text(names.join(','));
        setTimeout(() => {
            _displayCurrentReferenceAnnotations();
        }, 500);

    }

}

/**
 * Get the file names which currently are displayed.
 */
function getCurrentFileNames() {

    let text;

    // a PDF name.
    text = $('#dropdownPdf .js-text').text();
    let pdfName = (text !== 'PDF File' ? text : null);

    // a Primary anno.
    text = $('#dropdownAnnoPrimary .js-text').text();
    let primaryAnnotationName = (text !== 'Anno File' ? text : null);

    let referenceAnnotationNames = [];
    let referenceAnnotationColors = [];
    $('#dropdownAnnoReference a').each((index, element) => {
        let $elm = $(element);
        if ($elm.find('.fa-check').hasClass('no-visible') === false) {
            let annoName = $elm.find('.js-annoname').text();
            referenceAnnotationNames.push(annoName);
            let color = $elm.find('.js-anno-palette').spectrum('get').toHexString();
            referenceAnnotationColors.push(color);
        }
    });

    return {
        pdfName,
        primaryAnnotationName,
        referenceAnnotationNames,
        referenceAnnotationColors
    };
}

/**
 * Reset and setup the PDF dropdown.
 */
function setPDFDropdownList() {

    // Reset the state of the PDF dropdown.
    $('#dropdownPdf .js-text').text('PDF File');
    $('#dropdownPdf li').remove();

    // Create and setup the dropdown menu.
    const snipets = _getContentFiles().map(content => {
        return `
            <li>
                <a href="#">
                    <i class="fa fa-check no-visible"></i>&nbsp;
                    <span class="js-content-name">${content.name}</span>
                </a>
            </li>
        `;
    });
    $('#dropdownPdf ul').append(snipets.join(''));
}

/**
 * Reset and setup the primary/reference annotation dropdown.
 */
function setAnnoDropdownList() {

    // Reset the UI of primary/reference anno dropdowns.
    $('#dropdownAnnoPrimary ul').html('');
    $('#dropdownAnnoReference ul').html('');
    $('#dropdownAnnoPrimary .js-text').text('Anno File');
    $('#dropdownAnnoReference .js-text').text('Reference Files');

    // Setup anno / reference dropdown.
    _getAnnoFiles().forEach(file => {

        let snipet1 = `
            <li>
                <a href="#">
                    <i class="fa fa-check no-visible" aria-hidden="true"></i>
                    <span class="js-annoname">${file.name}</span>
                </a>
            </li>
        `;
        $('#dropdownAnnoPrimary ul').append(snipet1);

        let snipet2 = `
            <li>
                <a href="#">
                    <i class="fa fa-check no-visible" aria-hidden="true"></i>
                    <input type="text" name="color" class="js-anno-palette" autocomplete="off">
                    <span class="js-annoname">${file.name}</span>
                </a>
            </li>
        `;
        $('#dropdownAnnoReference ul').append(snipet2);
    });

    // Setup color pallets.
    setupColorPicker();
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setup"] = setup;
/**
 * UI parts - Content dropdown.
 */

/**
 * Setup the dropdown of PDFs.
 */
function setup({ 
        initialText,
        overrideWarningMessage,
        contentReloadHandler,
    }) {

    $('#dropdownPdf .js-text').text(initialText);

    // TODO pdfという単語を削除したい..

    $('#dropdownPdf').on('click', 'a', e => {

        const $this = $(e.currentTarget);

        // Get the name of PDF clicked.
        const pdfName = $this.find('.js-content-name').text();

        // Get the name of PDF currently displayed.
        const currentPDFName = $('#dropdownPdf .js-text').text();

        // No action, if the current PDF is selected.
        if (currentPDFName === pdfName) {
            console.log('Not reload. the contents are same.');
            return;
        }

        // Confirm to override.
        if (currentPDFName !== initialText) {
            if (!window.confirm(overrideWarningMessage)) {
                return;
            }
        }

        // Update PDF's name displayed.
        $('#dropdownPdf .js-text').text(pdfName);

        // Update the dropdown selection.
        $('#dropdownPdf .fa-check').addClass('no-visible');
        $this.find('.fa-check').removeClass('no-visible');

        // Reset annotations' dropdowns.
        resetCheckPrimaryAnnoDropdown();
        resetCheckReferenceAnnoDropdown();

        // Close dropdown.
        $('#dropdownPdf').click();

        // Reload Content.
        contentReloadHandler(pdfName);

        return false;
    });
}

/**
 * Reset the primary annotation dropdown selection.
 */
function resetCheckPrimaryAnnoDropdown() {
    $('#dropdownAnnoPrimary .js-text').text('Anno File');
    $('#dropdownAnnoPrimary .fa-check').addClass('no-visible');
}

/**
 * Reset the reference annotation dropdown selection.
 */
function resetCheckReferenceAnnoDropdown() {
    $('#dropdownAnnoReference .js-text').text('Reference Files');
    $('#dropdownAnnoReference .fa-check').addClass('no-visible');
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setup"] = setup;
/**
 * UI parts - Primary anno dropdown.
 */

/**
 * Setup a click action of the Primary Annotation Dropdown.
 */
function setup({
        clearPrimaryAnnotations,
        displayPrimaryAnnotation
    }) {

    $('#dropdownAnnoPrimary').on('click', 'a', e => {

        let $this = $(e.currentTarget);
        let annoName = $this.find('.js-annoname').text();

        let currentAnnoName = $('#dropdownAnnoPrimary .js-text').text();
        if (currentAnnoName === annoName) {

            let userAnswer = window.confirm('Are you sure to clear the current annotations?');
            if (!userAnswer) {
                return;
            }

            $('#dropdownAnnoPrimary .fa-check').addClass('no-visible');
            $('#dropdownAnnoPrimary .js-text').text('Anno File');

            clearPrimaryAnnotations();

            // Close
            $('#dropdownAnnoPrimary').click();

            return false;

        }

        // Confirm to override.
        if (currentAnnoName !== 'Anno File') {
            if (!window.confirm('Are you sure to load another Primary Annotation ?')) {
                return;
            }
        }

        $('#dropdownAnnoPrimary .js-text').text(annoName);

        $('#dropdownAnnoPrimary .fa-check').addClass('no-visible');
        $this.find('.fa-check').removeClass('no-visible');

        // Close
        $('#dropdownAnnoPrimary').click();

        // reload.
        displayPrimaryAnnotation(annoName);

        return false;
    });
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setup"] = setup;
/**
 * UI parts - Reference Annotation Dropdown.
 */

/**
 * Setup a click action of the Reference Annotation Dropdown.
 */
function setup({
    displayReferenceAnnotations
}) {

    $('#dropdownAnnoReference').on('click', 'a', e => {

        let $this = $(e.currentTarget);

        $this.find('.fa-check').toggleClass('no-visible');

        let annoNames = [];
        $('#dropdownAnnoReference a').each((index, element) => {
            let $elm = $(element);
            if ($elm.find('.fa-check').hasClass('no-visible') === false) {
                annoNames.push($elm.find('.js-annoname').text());
            }
        });
        if (annoNames.length > 0) {
            $('#dropdownAnnoReference .js-text').text(annoNames.join(','));
        } else {
            $('#dropdownAnnoReference .js-text').text('Reference Files');
        }

        // Display reference annotations.
        displayReferenceAnnotations(annoNames);

        return false;

    });

}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setup"] = setup;
/**
 * UI parts - Anno List Dropdown.
 */

/**
 * Setup the dropdown for Anno list.
 */
function setup({
        getAnnotations,
        scrollToAnnotation
    }) {

    // Show the list of primary annotations.
    $('#dropdownAnnoList').on('click', () => {

        // Create html snipets.
        let elements = getAnnotations().map(a => {

            let icon;
            if (a.type === 'span') {
                icon = '<i class="fa fa-pencil"></i>';
            } else if (a.type === 'relation' && a.direction === 'one-way') {
                icon = '<i class="fa fa-long-arrow-right"></i>';
            } else if (a.type === 'relation' && a.direction === 'two-way') {
                icon = '<i class="fa fa-arrows-h"></i>';
            } else if (a.type === 'relation' && a.direction === 'link') {
                icon = '<i class="fa fa-minus"></i>';
            } else if (a.type === 'area') {
                icon = '<i class="fa fa-square-o"></i>';
            }

            let snipet = `
                <li>
                    <a href="#" data-id="${a.uuid}">
                        ${icon}&nbsp;&nbsp;<span>${a.text || ''}</span>
                    </a>
                </li>
            `;

            return snipet;
        });

        $('#dropdownAnnoList ul').html(elements);

    });

    // Jump to the page that the selected annotation is at.
    $('#dropdownAnnoList').on('click', 'a', e => {

        let id = $(e.currentTarget).data('id');

        scrollToAnnotation(id);

        // Close the dropdown.
        $('#dropdownAnnoList').click();
    });

    // Update the number of display, at adding / updating/ deleting annotations.
    function watchPrimaryAnno(e) {
        $('#dropdownAnnoList .js-count').text(getAnnotations().length);
    }
    $(window)
        .off('annotationrendered annotationUpdated', watchPrimaryAnno)
        .on('annotationrendered annotationUpdated', watchPrimaryAnno);
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setup"] = setup;
/**
 * UI parts - Download Button.
 */

// TODO 機能としては必要だけど、どうしようか.
// import { unlistenWindowLeaveEvent } from '../util/window';

/**
 * Setup the behavior of a Download Button.
 */
function setup({
        getAnnotationTOMLString,
        getCurrentContentName
    }) {

    $('#downloadButton').off('click').on('click', e => {

        $(e.currentTarget).blur();

        getAnnotationTOMLString().then(annotations => {
            let blob = new Blob([annotations]);
            let blobURL = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            document.body.appendChild(a); // for firefox working correctly.
            a.download = _getDownloadFileName(getCurrentContentName);
            a.href = blobURL;
            a.click();
            a.parentNode.removeChild(a);
        });

        // TODO 復活する.
        // unlistenWindowLeaveEvent();

        return false;
    });

}


/**
 * Get the file name for download.
 */
function _getDownloadFileName(getCurrentContentName) {

    // The name of Primary Annotation.
    let primaryAnnotationName;
    $('#dropdownAnnoPrimary a').each((index, element) => {
        let $elm = $(element);
        if ($elm.find('.fa-check').hasClass('no-visible') === false) {
            primaryAnnotationName = $elm.find('.js-annoname').text();
        }
    });
    if (primaryAnnotationName) {
        return primaryAnnotationName;
    }

    // The name of Content.
    let pdfFileName = getCurrentContentName();
    return pdfFileName.split('.')[0] + '.anno';
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setup"] = setup;


function setup({ enableRect, disableRect }) {

    // Rect annotation button.
    $('.js-tool-btn-rect').off('click').on('click', (e) => {

        let $btn = $(e.currentTarget);

        // Make disable.
        if ($btn.hasClass('active')) {
            window.currentAnnoToolType = 'view';
            $btn.removeClass('active').blur();
            disableRect();

        // Make enable.
        } else {
            window.currentAnnoToolType = 'rect';
            $btn.addClass('active');
            enableRect();
        }

        return false;
    });
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setup"] = setup;


function setup({ createRelAnnotation }) {

    // Relation annotation button.
    $('.js-tool-btn-rel').off('click').on('click', e => {
        const $button = $(e.currentTarget);
        const type = $button.data('type');
        createRelAnnotation(type);
        $button.blur();
    });
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setup"] = setup;


function setup({ createSpanAnnotation }) {

    $('.js-tool-btn-span').off('click').on('click', e => {

        $(e.currentTarget).blur();

        createSpanAnnotation();
    });
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setup"] = setup;
/* harmony export (immutable) */ __webpack_exports__["enable"] = enable;
/* harmony export (immutable) */ __webpack_exports__["disable"] = disable;
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

function setup({ getSelectedAnnotations, saveAnnotationText }) {

    _getSelectedAnnotations = getSelectedAnnotations;
    _saveAnnotationText = saveAnnotationText;

    // set datalist.
    setDatalist();

    // set actions.
    setupActions();

    // Start to listen window events.
    listenWindowEvents();
}


function enable({ uuid, text, disable=false, autoFocus=false, blurListener=null }) {
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

function disable() {
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


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setup"] = setup;
/**
 * UI parts - Upload Button.
 */

function setup({
        getCurrentDisplayContentFile,
    }) {
    $('.js-btn-upload').off('click').on('click', () => {

        const contentFile = getCurrentDisplayContentFile();
        if (!contentFile) {
            return alert('Display a content before upload.');
        }

        function arrayBufferToBase64( buffer ) {
            var binary = '';
            var bytes = new Uint8Array( buffer );
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode( bytes[ i ] );
            }
            return window.btoa( binary );
        }

        const contentBase64 = arrayBufferToBase64(contentFile.content);


        const $progressBar = $('.js-upload-progress');

        const url = $('#serverURL').val();
        if (!url) {
            return alert('Set server URL.');
        }

        $('#uploadResult').val("Waiting for response...");

        $.ajax({
            xhr: function(){
               var xhr = new window.XMLHttpRequest();
               //Upload progress
               xhr.upload.addEventListener("progress", function(evt){
               if (evt.lengthComputable) {
                 var percentComplete = evt.loaded / evt.total;
                 //Do something with upload progress
                 console.log('uploadProgress:', percentComplete);

                 let percent = Math.floor(percentComplete * 100);
                 $progressBar.find('.progress-bar').css('width', percent + '%').attr('aria-valuenow', percent).text(percent + '%');
                 if (percent === 100) {
                    setTimeout(() => {
                        $progressBar.addClass('hidden');
                    }, 2000);
                 }
                }
               }, false);
               //Download progress
               xhr.addEventListener("progress", function(evt){
                 if (evt.lengthComputable) {
                   var percentComplete = evt.loaded / evt.total;
                   //Do something with download progress
                   console.log('downloadProgress:', percentComplete);
                 }
               }, false);
               return xhr;
            },
            url : url,
            method : 'POST',
            dataType : "text",
            data : contentBase64
            //dataType : 'json',
            //data : { name : pdfFileName, content : contentBase64 }
        }).then(result => {
            console.log('result:', result);
            setTimeout(() => {
                // alert('Upload completed.');
                var json = JSON.parse(result);
                $('#uploadResult').val(json.text);
                window.addAll(json.anno);
            }, 500); // wait for progress bar animation.
        });

        // Show.
        $progressBar.removeClass('hidden').find('.progress-bar').css('width', '0%').attr('aria-valuenow', 0).text('0%');

        return false;
    });
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map