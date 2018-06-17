module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],
        files: [
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
    })
}
        
