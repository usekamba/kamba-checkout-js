module.exports = {
    entry: './index.js',
    output: {
        path: __dirname,
        filename: 'kamba-web-sdk.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                      }
                }
            }
        ],
    },
};