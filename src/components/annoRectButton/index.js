/**
 * UI parts - Anno Tools for RectAnnotation.
 */
export function setup ({ enableRect, disableRect }) {
    // Rect annotation button.
    $('.js-tool-btn-rect').off('click').on('click', (e) => {
        let $btn = $(e.currentTarget)

        // Make disable.
        if ($btn.hasClass('active')) {
            window.currentAnnoToolType = 'view'
            $btn.removeClass('active').blur()
            disableRect()

        // Make enable.
        } else {
            window.currentAnnoToolType = 'rect'
            $btn.addClass('active')
            enableRect()
        }

        return false
    })
}
