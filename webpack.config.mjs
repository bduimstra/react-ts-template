import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const prod = process.env.NODE_ENV === 'production';

export default {
    mode: prod ? 'production' : 'development',
    devtool: prod ? undefined : 'source-map',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'esbuild-loader',
                options: {
                    target: 'esnext',
                    jsx: 'automatic',
                },
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json'],
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: import.meta.dirname + '/dist/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
};
