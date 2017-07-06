import annoUI from './src/index';


function createEchoFunction() {
    let obj = {};
    [...arguments].forEach(key => {
        obj[key] = (...args) => console.log(key, args);
    });
    return obj;
}

window.addEventListener('DOMContentLoaded', e => {

    // TODO 使い勝手を後で考える.
    // annoUI.browseButton.setup();

    // annoUI.annoRectButton.setup({
    //     enableRect  : () => console.log("enableRect"),
    //     disableRect : () => console.log("disableRect"),
    // });

    // Annotation buttons.
    annoUI.annoRectButton.setup(createEchoFunction('enableRect', 'disableRect'));
    annoUI.annoSpanButton.setup(createEchoFunction('createSpanAnnotation'));
    annoUI.annoRelButton.setup(createEchoFunction('createRelAnnotation'));




});