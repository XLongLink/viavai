import path from 'path';
import webpack from 'webpack';


class WebpackConfig {
    /* Handle the logic to compile the index.jsx to a single bundle.js file */

    constructor(input = "ui/index.jsx", output = "viavai/static/bundle.js") {
        const rootDir = process.cwd();
        const outputPath = path.dirname(output);
        const outputFilename = path.basename(output);

        this.config = {
            mode: 'production',
            entry: path.resolve(rootDir, input),
            output: {
                path: path.resolve(rootDir, outputPath),
                filename: outputFilename,
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
            /* TODO: Add here all the libraries as external */
            externals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        };
    }

    runWebpack() {
        webpack(this.config, (err, stats) => {
            if (err || stats.hasErrors()) {
                console.error(err || stats.toJson().errors);
                return;
            }
            // console.log(stats.toString({
            //     colors: true,
            //     modules: false,
            //     children: false,
            //     chunks: false,
            //     chunkModules: false,
            // }));
        });
    }
}


new WebpackConfig().runWebpack();