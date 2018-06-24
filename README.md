# anno-ui
UI parts for PDFAnno and HTMLAnno.

## Dependencies
Put the code below in your html file.
```
<!-- css -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
<!-- js -->
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>

```

## How to test anno-ui.

### Dependencies

- Chrome web browser (this is detected automatically by [Puppeteer](https://github.com/GoogleChrome/puppeteer) and karma-chrome-launcher)

```
npm test
```

## How to develop with anno-ui.
When developing an application like [pdfanno](https://github.com/paperai/pdfanno) or [htmlanno](https://github.com/paperai/htmlanno) depending on anno-ui, you sometimes have to write code for both - your app and anno-ui. In such case, [npm link](https://docs.npmjs.com/cli/link) will help you want to do.  
Describes How to use it.
```sh
# Move to anno-ui directory.
cd /path/to/anno-ui

# Create Symlink.
npm link

# Move to your app.
cd /path/to/pdfanno

# Use Symlink instead of `npm install`.
npm link anno-ui
```
That's all.
