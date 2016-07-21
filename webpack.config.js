var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: [
        //'webpack-dev-server/client?http://localhost:3000',
        //'webpack/hot/only-dev-server',
        path.join(__dirname, 'src/js/entry.js')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: "/"
    },

    /*
    devServer: {
        contentBase: "dist",
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        stats: 'errors-only',
        port: 2500
    },
    */

    devtool: 'eval',

    resolve: {
        root: path.resolve(__dirname, 'src/js'),
        extensions: ['', '.js'],
        modulesDirectories: ["node_modules", "bower_components"]
    },

    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                loaders: [ 'react-hot-loader', 'babel-loader' ],
                include: [path.resolve(__dirname, "src/js")],
                exclude: ["dist", "src/lib", "node_modules", "bower_components"],
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    },

    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
        new webpack.NoErrorsPlugin()
    ]
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('c/client?http://localhost:9090');
        sources.push('webpack/hot/only-dev-server');
    }
}
