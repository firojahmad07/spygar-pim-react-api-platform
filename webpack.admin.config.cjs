const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') })

const ENV = JSON.stringify(process.env.APP_ENV || "development");
const adminMain = path.resolve(__dirname, './public/admin/main.tsx');
let distPath = path.resolve(__dirname, './public/dist');

function getEntryFiles() {
    return {
        'bundle': adminMain, // Ensure it's a valid entry
    };
}

const adminConfiguration = {
    mode: ('dev' == ENV) ? 'development' : 'production',
    entry: getEntryFiles(),
    output: {
        path: distPath,  // Fixed this
        filename: 'admin.bundle.js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
        alias: {
            "@": path.resolve(__dirname, "./public/admin/")
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.REACT_APP_API_URL": JSON.stringify(process.env.REACT_APP_API_URL || ""),
            "process.env.REACT_APP_ENV": JSON.stringify(process.env.APP_ENV || "development"),
        })
    ]
};

module.exports = adminConfiguration;
