const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    optimization: {
        runtimeChunk: false,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                    compress: {
                        pure_funcs: ['console.log'],
                        global_defs: require('@angular/compiler-cli').GLOBAL_DEFS_FOR_TERSER
                    }
                }
            })
        ]
    },
    output: {
        library: 'app' + Date.now()
    }

}