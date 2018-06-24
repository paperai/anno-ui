module.exports = function (config) {
    config.set({
        frameworks: [
            'jquery-3.1.1',
            'mocha'
        ],
        files: [
            'https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js',
            'test/index.js'
        ],
        preprocessors: {
            'test/index.js': ['webpack']
        },
        reporters: [
            'spec'
        ],
        browsers: [
            'ChromeHeadless'
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-jquery',
            'karma-mocha',
            'karma-spec-reporter',
            'karma-webpack'
        ]
    })
}
        
