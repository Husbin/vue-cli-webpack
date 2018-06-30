const path = require('path');
console.log(path.resolve(__dirname,'dist'))//F:\git_project\vue-cli-webpack\config\dist

module.exports = {
    mode:'development',
    //口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
    // 进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
    entry:'../src/main.js',
    //output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。
    // 基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。可以通过在配置中指定一个 output 字段，来配置这些处理过程
    output:{
        //path.resolve方法用于将相对路径转为绝对路径。
        path:path.resolve(__dirname,'../dist'),
        filename: "bundle.js"
    }
}