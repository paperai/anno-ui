/**
 * UI parts - Upload Button.
 */
import * as alertDialog from '../../uis/alertDialog';

export function setup({
        getCurrentDisplayContentFile,
    }) {
    $('.js-btn-upload').off('click').on('click', () => {

        const contentFile = getCurrentDisplayContentFile();
        if (!contentFile) {
            return alertDialog.show({ message : 'Display a content before upload.' });
        }

        function arrayBufferToBase64(buffer) {
            var s = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                s += String.fromCharCode(bytes[i]);
            }
            return window.btoa(s);
        }

        const contentBase64 = arrayBufferToBase64(contentFile.content);

        const $progressBar = $('.js-upload-progress');

        const url = $('#serverURL').val();
        if (!url) {
            return alertDialog.show({ message : 'Set server URL.' });
        }

        $('#uploadResult').val("Waiting for response...");


        let data = {
            filename : contentFile.name,
            pdf      : contentBase64
        };

        $.ajax({
            xhr: function(){
               var xhr = new window.XMLHttpRequest();
               //Upload progress
               xhr.upload.addEventListener("progress", function(evt){
               if (evt.lengthComputable) {
                 var percentComplete = evt.loaded / evt.total;
                 //Do something with upload progress
                 console.log('uploadProgress:', percentComplete);

                 let percent = Math.floor(percentComplete * 100);
                 $progressBar.find('.progress-bar').css('width', percent + '%').attr('aria-valuenow', percent).text(percent + '%');
                 if (percent === 100) {
                    setTimeout(() => {
                        $progressBar.addClass('hidden');
                    }, 2000);
                 }
                }
               }, false);
               //Download progress
               xhr.addEventListener("progress", function(evt){
                 if (evt.lengthComputable) {
                   var percentComplete = evt.loaded / evt.total;
                   //Do something with download progress
                   console.log('downloadProgress:', percentComplete);
                 }
               }, false);
               return xhr;
            },
            url      : url,
            method   : 'POST',
            dataType : 'json',
            data

        }).then(result => {
            console.log('result:', result);

            if (result.status === 'NG') {
                alert('ERROR!!')
            }

            setTimeout(() => {
                $('#uploadResult').val(result.result || result.err.stderr);
            }, 500); // wait for progress bar animation.
        });

        // Show.
        $progressBar.removeClass('hidden').find('.progress-bar').css('width', '0%').attr('aria-valuenow', 0).text('0%');

        return false;
    });
}

