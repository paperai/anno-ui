/**
 * UI parts - Anno Tools for RelationAnnotation (one-way / two-way / link).
 */


export function setup({ createRelAnnotation }) {

    // Relation annotation button.
    $('.js-tool-btn-rel').off('click').on('click', e => {
        const $button = $(e.currentTarget);
        const type = $button.data('type');
        createRelAnnotation(type);
        $button.blur();
    });
}
