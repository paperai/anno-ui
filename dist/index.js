/******/ (function(modules) { // webpackBootstrap
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_annoRectButton__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_annoRelButton__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_annoSpanButton__ = __webpack_require__(4);






/* harmony default export */ __webpack_exports__["default"] = ({
    browseButton: __WEBPACK_IMPORTED_MODULE_0__components_browseButton__,
    annoRectButton: __WEBPACK_IMPORTED_MODULE_1__components_annoRectButton__,
    annoRelButton: __WEBPACK_IMPORTED_MODULE_2__components_annoRelButton__,
    annoSpanButton: __WEBPACK_IMPORTED_MODULE_3__components_annoSpanButton__
});



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

// import { setupColorPicker } from '../util/display';

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
    $('.js-anno-palette').off('change').on('change', window.annoPage.displayAnnotation.bind(null, false));
}



/**
 * Setup the behavior of a Browse Button.
 */
function setup({ fileLoader }) {

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

        // window.annoPage.loadFiles(files).then(() => {
        fileLoader(files).then(() => {

            // Get current visuals.
            const current = getCurrentFileNames();

            // Initialize PDF Viewer.
            window.annoPage.clearAllAnnotations();

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
    files = window.annoPage.contentFiles.filter(c => c.name === currentDisplay.pdfName);
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

        window.annoPage.closePDFViewer();
    }

    // Restore the check state of a primaryAnno.
    files = window.annoPage.annoFiles.filter(c => c.name === currentDisplay.primaryAnnotationName);
    if (files.length > 0 && isPDFClosed === false) {
        $('#dropdownAnnoPrimary .js-text').text(currentDisplay.primaryAnnotationName);
        $('#dropdownAnnoPrimary a').each((index, element) => {
            let $elm = $(element);
            if ($elm.find('.js-annoname').text() === currentDisplay.primaryAnnotationName) {
                $elm.find('.fa-check').removeClass('no-visible');
            }
        });
        setTimeout(() => {
            window.annoPage.displayAnnotation(true, false);
        }, 100);
    }

    // Restore the check states of referenceAnnos.
    let names = currentDisplay.referenceAnnotationNames;
    let colors = currentDisplay.referenceAnnotationColors;
    names = names.filter((name, i) => {
        let found = false;
        let annos = window.annoPage.annoFiles.filter(c => c.name === name);
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
            window.annoPage.displayAnnotation(false, false);
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
    const snipets = window.annoPage.contentFiles.map(content => {
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
    window.annoPage.annoFiles.forEach(file => {

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
/* 3 */
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
/* 4 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map