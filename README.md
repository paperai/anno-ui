# anno-ui
UI parts for PDFAnno and HTMLAnno.

## Dependencies
anno-ui depends on `jQuery`.

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
