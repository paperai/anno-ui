let _applicationName = 'pdfanno'

export function setup ({
    applicationName
}) {
    _applicationName = applicationName
}

export function applicationName () {
    return _applicationName
}
