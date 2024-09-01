import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import { PACKAGES } from './constants.mjs';
import TerserPlugin from 'terser-webpack-plugin';


export class WebpackPackager {
    /* 
        Handle the logic to compile a single react component to js file d 
    */

    constructor(input, output) {
        this.input = input;
        this.output = output;

        console.log('WebpackPackager created', this.input, this.output);
    }

    getConfig() {
        // Split the output in folder and filename
        const outputParts = this.output.split('/');
        const outputFilename = outputParts.pop();
        const outputFolder = outputParts.join('/');

        // Ensure the output folder exists
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
        }

        return {
            mode: 'production',
            entry: path.resolve(this.input),
            output: {
                path: path.resolve(outputFolder),
                filename: outputFilename,
                libraryTarget: 'umd',
                globalObject: 'this',
            },
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',  // Transpile modern JavaScript
                                    '@babel/preset-react' // Transpile React JSX
                                ],
                            },
                        },
                    },
                ],
            },
            resolve: {
                extensions: ['.js', '.jsx'],
            },
            externals: PACKAGES,
            optimization: {
                minimizer: [new TerserPlugin({
                    extractComments: false,
                })],
            }

        };
    }

    pack() {
        webpack(this.getConfig(), (err, stats) => {
            if (err || stats.hasErrors()) {
                console.error(err || stats.toJson().errors);
                return;
            }
        });
    }
}