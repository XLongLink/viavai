const path = require('path');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname, '..');

const config = {
    mode: 'production',
    entry: './src/components/ComponentA.jsx',
    output: {
        path: path.resolve(rootDir, '.dist'),
        filename: 'component.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};

webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.error(err || stats.toJson().errors);
        return;
    }
    console.log(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }));
});
