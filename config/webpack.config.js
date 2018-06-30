const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    //webpack4.0新增，可选择设置为development和production
    mode:'development',
    //口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
    // 进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
    entry:'./src/main.js',
    //output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。
    // 基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。可以通过在配置中指定一个 output 字段，来配置这些处理过程
    output:{
        //path.resolve方法用于将相对路径转为绝对路径。
        path:path.resolve(__dirname,'dist'),
        filename: "bundle.js"
    },
    //loader 用于对模块的源代码进行转换。
    module: {
        rules: [
            //配置babel-loader
            {
                test:'/\.js$/',             //匹配js文件
                loader: "babel-loader",     //用于解析对应的文件
                exclude:/node_modules/      //不包括node_module下的js文件
            },
            //配置css-loader
            {
                test:/\.css$/,
                loader: "style-loader!css-loader"
            },
            //配置url-loader
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit:10000
                }
            },
            //配置字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    //这些选项能设置模块如何被解析。
    resolve: {
        //自动解析确定的扩展。
        extensions: ['.js','.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    //插件目的在于解决 loader 无法实现的其他事。
    plugins:[
        new HtmlWebpackPlugin({
            title: 'vue-cli-webpack',
            template: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    //告知开发服务器需要从哪儿加载文件
    devServer:{
        contentBase:"./dist"
    },
}