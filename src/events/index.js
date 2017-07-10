/**
 * Event listeners.
 */

/**
 * Initializer.
 */
export function setup() {
    $(document).on('keydown', e => {

        if (e.keyCode === 17 || e.keyCode === 91) { // 17:ctrlKey, 91:cmdKey
            dispatchWindowEvent('manageCtrlKey', 'on');
        }

    }).on('keyup', e => {

        // Allow any keyboard events for <input/>.
        if (e.target.tagName.toLowerCase() === 'input') {
            return;
        }

        dispatchWindowEvent('manageCtrlKey', 'off');

        if (e.keyCode === 49) {         // Digit "1"
            dispatchWindowEvent('digitKeyPressed', 1);
        } else if (e.keyCode === 50) {  // Digit "2"
            dispatchWindowEvent('digitKeyPressed', 2);
        } else if (e.keyCode === 51) {  // Digit "3"
            dispatchWindowEvent('digitKeyPressed', 3);
        } else if (e.keyCode === 52) {  // Digit "4"
            dispatchWindowEvent('digitKeyPressed', 4);
        }
    });
}

/**
 * Dispatch a custom event to `window` object.
 */
function dispatchWindowEvent(eventName, data) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, data);
    window.dispatchEvent(event);
}
