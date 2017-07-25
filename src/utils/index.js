/**
 * Make the UI resizable.
 */
export function setupResizableColumns() {

    // Make resizable.
    $('#tools').resizable({
      handles: 'e',
      alsoResizeReverse: '#viewerWrapper',
      start : () => {
        console.log('resize start');
        $('#viewer iframe').css({
            'pointer-events' : 'none',
        });

      },
      stop : () => {
        console.log('resize stop');
        $('#viewer iframe').css({
            'pointer-events' : 'auto',
        });

      }
    });

    // Customize.
    $.ui.plugin.add("resizable", "alsoResizeReverse", {

        start: function() {
            var that = $(this).resizable( "instance" ),
                o = that.options;

            $(o.alsoResizeReverse).each(function() {
                var el = $(this);
                el.data("ui-resizable-alsoresizeReverse", {
                    width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
                    left: parseInt(el.css("left"), 10), top: parseInt(el.css("top"), 10)
                });
            });
        },

        resize: function(event, ui) {
            var that = $(this).resizable( "instance" ),
                o = that.options,
                os = that.originalSize,
                op = that.originalPosition,
                delta = {
                    height: (that.size.height - os.height) || 0,
                    width: (that.size.width - os.width) || 0,
                    top: (that.position.top - op.top) || 0,
                    left: (that.position.left - op.left) || 0
                };

            $(o.alsoResizeReverse).each(function() {
                var el = $(this), start = $(this).data("ui-resizable-alsoresize-reverse"), style = {},
                    css = el.parents(ui.originalElement[0]).length ?
                        [ "width", "height" ] :
                        [ "width", "height", "top", "left" ];

                $.each(css, function(i, prop) {
                    var sum = (start[prop] || 0) - (delta[prop] || 0);
                    if (sum && sum >= 0) {
                        style[prop] = sum || null;
                    }
                });

                el.css(style);
            });
        },

        stop: function() {
            $(this).removeData("resizable-alsoresize-reverse");
        }
    });
}


/**
 * Convert object to TOML String.
 */
export function tomlString(obj, root=true) {

    let lines = [];

    // `version` is first.
    if ('version' in obj) {
        lines.push(`version = "${obj['version']}"`);
        lines.push('');
        delete obj['version'];
    }

    // #paperanno-ja/issues/38
    // Make all values in `position` as string.
    if ('position' in obj) {
        let position = obj.position;
        position = position.map(p => {
            if (typeof p === 'number') {
                return String(p);
            } else {
                return p.map(v => String(v));
            }
        });
        obj.position = position;
    }

    Object.keys(obj).forEach(prop => {

        let val = obj[prop];
        if (typeof val === 'string') {
            lines.push(`${prop} = "${val}"`);
            root && lines.push('');

        } else if (typeof val === 'number') {
            lines.push(`${prop} = ${val}`);
            root && lines.push('');

        } else if (isArray(val)) {
            lines.push(`${prop} = ${JSON.stringify(val)}`);
            root && lines.push('');

        } else if (typeof val === 'object') {
            lines.push(`[${prop}]`);
            lines.push(tomlString(val, false));
            root && lines.push('');
        }
    });

    return lines.join('\n');
}

function isArray(val) {
    return val && 'length' in val;
}
