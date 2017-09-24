/**
 * Functions - upload and analyze a PDF.
 */
export function upload ({
    contentFile,
    willStartCallback = function () {},
    progressCallback = function () {},
    successCallback = function () {},
    failedCallback = function () {}
} = {}) {

    // Convert PDF to base64 string.
    const contentBase64 = arrayBufferToBase64(contentFile.content)

    // API endpoint.
    const url = window.API_ROOT + '/api/pdf_upload'

    // API params.
    let data = {
        filename : contentFile.name,
        pdf      : contentBase64
    }

    // Callback before ajax call.
    willStartCallback()

    // Call the API.
    $.ajax({
        xhr : function () {
            var xhr = new window.XMLHttpRequest()
            // Upload progress
            xhr.upload.addEventListener('progress', function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total
                    // Do something with upload progress
                    console.log('uploadProgress:', percentComplete)
                    let percent = Math.floor(percentComplete * 100)
                    progressCallback(percent)
                    // $progressBar.find('.progress-bar').css('width', percent + '%').attr('aria-valuenow', percent).text(percent + '%')
                    // if (percent === 100) {
                    //     setTimeout(() => {
                    //         $progressBar.addClass('hidden')
                    //     }, 2000)
                    // }
                }
            }, false)
            // Download progress
            // xhr.addEventListener('progress', function (evt) {
            //     if (evt.lengthComputable) {
            //         var percentComplete = evt.loaded / evt.total
            //         // Do something with download progress
            //         console.log('downloadProgress:', percentComplete)
            //     }
            // }, false)
            return xhr
        },
        url      : url,
        method   : 'POST',
        dataType : 'json',
        data

    }).then(result => {
        if (result.status === 'failure') {
            failedCallback(result.err.stderr)
            // alert('ERROR!!')
            // setResult(result.err.stderr)
            return
        }

        setTimeout(() => {
            successCallback(result.text)
            // setResult(result.text)
            // uploadFinishCallback && uploadFinishCallback(result.text)
        }, 500) // wait for progress bar animation.
    })

    // Show.
    // $progressBar.removeClass('hidden').find('.progress-bar').css('width', '0%').attr('aria-valuenow', 0).text('0%')

    // return false

}

function arrayBufferToBase64 (buffer) {
    var s = ''
    var bytes = new Uint8Array(buffer)
    var len = bytes.byteLength
    for (var i = 0; i < len; i++) {
        s += String.fromCharCode(bytes[i])
    }
    return window.btoa(s)
}
