/**
 * UI parts - Anno Tools for SpanAnnotation.
 */

export function setup({ createSpanAnnotation }) {

    $('.js-tool-btn-span').off('click').on('click', e => {

        $(e.currentTarget).blur();

        createSpanAnnotation();
    });
}
