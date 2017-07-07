import * as annoUI from './src/index';

function createEchoFunction() {
    let obj = {};
    [...arguments].forEach(key => {
        obj[key] = (...args) => console.log(key, args);
    });
    return obj;
}

window.addEventListener('DOMContentLoaded', e => {

    // TODO pdfanno.jsに書いてる、window系の処理はどうしたら良いだろうか・・。

    // TODO ちょっと複雑だからなんとかしたいなー.
    // Browse button.
    annoUI.browseButton.setup({
        loadFiles : files => { 
            console.log('loadFiles:', files);
            return Promise.resolve();
        },
        clearAllAnnotations : () => console.log('clearAllAnnotations'),
        displayCurrentReferenceAnnotations : () => console.log('displayCurrentReferenceAnnotations'),
        displayCurrentPrimaryAnnotations : () => console.log('displayCurrentPrimaryAnnotations'),
        getContentFiles : () => {
            console.log('getContentFiles');
            return [];
        },
        getAnnoFiles : () => {
            console.log('getAnnoFiles');
            return [];
        },
        closePDFViewer : () => console.log('closePDFViewer')
    });


    // AnnoTool: rect.
    annoUI.annoRectButton.setup({
        enableRect : () => console.log('enableRect'),
        disableRect : () => console.log('disableRect'),
    });

    // AnnoTool: span.
    annoUI.annoSpanButton.setup({
        createSpanAnnotation : () => console.log('createSpanAnnotation')
    });

    // AnnoTool: relation.
    annoUI.annoRelButton.setup({
        createRelAnnotation : (relType) => console.log('createRelAnnotation', relType)
    });

    // Content dropdown.
    annoUI.contentDropdown.setup({
        initialText : () => 'initial label text',
        overrideWarningMessage : () => 'warning message when override.',
        contentReloadHandler : fileName => console.log('contentReloadHandler:', fileName)
    });

    // Primary anno dropdown.
    annoUI.primaryAnnoDropdown.setup({
        clearPrimaryAnnotations : () => console.log('clearPrimaryAnnotations'),
        displayPrimaryAnnotation : annoName => console.log('displayPrimaryAnnotation:', annoName)
    });

    // Reference anno dropdown.
    annoUI.referenceAnnoDropdown.setup({
        displayReferenceAnnotations : annoNames => console.log('displayReferenceAnnotations:', annoNames)
    });

    // Anno list dropdown.
    annoUI.annoListDropdown.setup({
        getAnnotations : () => [],
        scrollToAnnotation : id => console.log('scrollToAnnotation:', id)
    });

    // Download button.
    annoUI.downloadButton.setup({
        getAnnotationTOMLString : () => 'TOML STRING',
        getCurrentContentName : () => 'CurrentContentName.pdf'
    });

    // Label input.
    annoUI.labelInput.setup({
        getSelectedAnnotations : () => [],
        saveAnnotationText : (id, text) => console.log('saveAnnotationText:', id, text)
    });

});