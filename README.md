# vue-cli-webpack
> 从零开始搭Vue项目，主要是想脱离对脚手架全家桶的依赖，以及从中深入学习一点webpack相关的知识，不要每次打开package.json以及webpack的配置文件都一脸懵逼。

### 新建项目

```bash
mkdir vue-cli-webpack
cd vue-cli-webpack
```

### 使用`npm init`生成package.json文件

```bash
npm init
```

执行上述命令后，在项目文件夹下生成了`package.json`文件。

文件中的各个字段介绍：[package.json文件](http://javascript.ruanyifeng.com/nodejs/packagejson.html)

### 引入webpack

webpack使用教程：[webpack](https://webpack.docschina.org/concepts/)

```bash
npm install webpack --save-dev
npm install webpack-cli -D
```

然后创建一些必要的文件：

```bash
touch index.html
mkdir src
cd src
touch main.js
```

main.js文件如下：

```javascript
console.log("hello world");
```

index.html文件如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script src="dist/bundle.js"></script>
</body>
</html>
```

### 创建webpack.config.js文件

在项目目录下执行下面指令，懒的话直接gui创建就行了。

```bash
mkdir config
cd config
touch webpack.config.js
```

webpack.config.js文件内容如下：

**一定要注意路径，不然很容易翻车车。**

```javascript
const path = require('path');
console.log(path.resolve(__dirname,'dist'))//F:\git_project\vue-cli-webpack\config\dist，因此使用'../dist'返回上一层，使生成的dist的路径为F:\git_project\vue-cli-webpack\dist

module.exports = {
    //webpack4.0新增，可选择设置为development和production
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
```

### 使用webpack命令编译项目

**需要在webpack.config.js文件所在的目录下执行下面的命令：**

```bash
cd config
webpack
```

执行完毕后会在项目目录下生成dist文件夹（包括打包好的bundle.js文件）。此时项目目录结构如下：

![image.png](https://upload-images.jianshu.io/upload_images/7166236-e5a81300b4268748.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

此时用浏览器打开index.html文件，控制台打印如下：

![image.png](https://upload-images.jianshu.io/upload_images/7166236-e93aee9c1f4f7bc7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 引入vue

在项目目录下执行下面指令：

```bash
npm install vue
```

修改main.js文件

```javascript
import Vue from 'vue';
let vm = new Vue({
    el:'#app',
    data:function () {
        return{
            msg:'hello vue'
        }
    },
    template:'<p id="p-text">{{msg}}</p>',
    created(){
        console.log(this.msg);
    }
})
```

### 引入babel

```bash
npm install --save-dev babel-core babel-loader
```

由于在使用vue时会用到很多es6的语法，但是现在很多浏览器对es6的支持不是很好，所以在编译时需要将这些语法转换es5的语法，此时我们使用babel来进行编译。 

配置webpack.config.js

```javascript
//loader 用于对模块的源代码进行转换。
module: {
        rules: [
            //配置babel-loader
            {
                test:'/\.js$/',             //匹配js文件
                loader: "babel-loader",     //用于解析对应的文件
                exclude:/node_modules/      //不包括node_module下的js文件
            }
        ]
    }
```

执行`webpack`命令重新打包，打开index.html，打印如下：

![image.png](https://upload-images.jianshu.io/upload_images/7166236-9b1c2aafde2069ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

因为正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本，需要在配置文件中添加如下代码 :

```javascript
//这些选项能设置模块如何被解析。 
resolve: {
    alias: {
       'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
 }
```

### webpack一些常用配置

在项目的实际开发中我们还会引入css、图片以及字体等资源文件。这些文件的引入都需要相应的加载器才能将其加载到项目中并正常使用。

下面只介绍部分我们需要的加载器的使用方法, 更多信息请查阅[webpack加载器文档](https://link.juejin.im/?target=https%3A%2F%2Fdoc.webpack-china.org%2Floaders)。

#### css加载器

```bash
npm install --save-dev css-loader style-loader
```

配置webpack.config.js的loader规则

```javascript
//配置css-loader
{
    test:/\.css$/,
    loader: "style-loader!css-loader"
}
```

新增一个样式文件：

```bash
cd src
mkdir styles
cd styles
touch main.css
```

main.css如下：

```css
#p-text{
    width: 100%;
    text-align: center;
    color: red;
}
```

在main.js中引入main.css

```javascript
import './styles/main.css'
```

重新编译程序，打开index.html如下：

![image.png](https://upload-images.jianshu.io/upload_images/7166236-d91beb572d344fc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 配置图片资源加载器

使用file-loader或者url-loader加载器进行加载，他们都是用于打包文件和图片资源的，两者的区别是url-loader在file-loader的基础上进行了一次封装。

在访问网站时如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。**url-loader会将引入的图片编码，生成dataURl（base64编码，优化方案之一）。相当于把图片数据翻译成一串字符,再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。**

当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。

此处我们使用url-loader,由于它是基于file-loader的封装，所以也需要引入file-loader。

```bash
npm install --save-dev file-loader url-loader
```

配置webpack.config.js：

```javascript
//配置url-loader
{
    test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: "url-loader",
    options: {
        imit:10000，		//大于10kb不转码
    }
}
```

接下来引入图片，修改main.js如下：

```javascript
import Vue from 'vue';
import './styles/main.css'
import img from './img/snow.png'
let vm = new Vue({
    el:'#app',
    data:function () {
        return{
            msg:'hello vue',
            img:img,
        }
    },
    template:'<div><p id="p-text">{{msg}}</p><img style="display: block;width: 100%" :src="img"></div>',
    created(){
        console.log(this.msg);
    }
})
```

重新打包编译，效果如下：

![image.png](https://upload-images.jianshu.io/upload_images/7166236-df80d6fc8f263927.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

查看bundle.js文件，图片已经被转码：

![image.png](https://upload-images.jianshu.io/upload_images/7166236-cbd8811f98af3c1e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/7166236-3b1b96566a1b14ba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 字体加载

字体的加载方式与图片的一样也是用url-loader，配置如下 ：

```javascript
//配置字体
{
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
            options: {
                limit: 10000
            }
}
```



### HtmlWebpackPlugin 插件

这个插件用来简化创建服务于 webpack bundle 的 HTML 文件，尤其是对于在文件名中包含了 hash 值，而这个值在每次编译的时候都发生变化的情况。你既可以让这个插件来帮助你自动生成 HTML 文件，也可以使用 lodash 模板加载生成的 bundles，或者自己加载这些 bundles。 

```bash
npm install --save-dev html-webpack-plugin
```

在webpack.config.js中配置插件：

```javascript
//插件目的在于解决 loader 无法实现的其他事。
plugins:[
    new HtmlWebpackPlugin({
        title: 'vue-cli-webpack',
        template: '../index.html'
    })
]
```

删除index.html中的下面部分代码：

```html
<script src="dist/bundle.js"></script>
```



在config目录下执行`webpack`重新打包编译，此时目录结构如下：

![image.png](https://upload-images.jianshu.io/upload_images/7166236-3fe992fd3459cd70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

此时打开dist文件夹下的index.html，效果如下（本次图片大小大于10k）：

![image.png](https://upload-images.jianshu.io/upload_images/7166236-3168ffa77158fc5d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### webpack-dev-server

在我们实际开发中需要将代码部署在server中，而不是在浏览器中直接打开文件。此时我们需要使用webpack的 webpack-dev-server 。

webpack-dev-server 为我们提供了一个简单的web服务器，并且能够实时重新加载（live reloading）。

```bash
npm install --save-dev webpack-dev-server
```

在webpack.config.js 文件中需要指定一个文件夹,告诉开发服务器需要从哪儿加载文件：

```javascript
//告知开发服务器需要从哪儿加载文件
devServer:{
    contentBase:"./dist"
},
```

配置`package.json`的`script`脚本：

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    //前面部分是执行的指令+参数，后面部分是执行的目录，也就是说在config/webpack.config.js目录下执行
    "dev": "webpack-dev-server --open  --inline --progress --config config/webpack.config.js",
    "build": "webpack config/webpack.config.js"
},
```

**重新修改webpack.config.js中的路径信息如下：**

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test:'/\.js$/',             
                loader: "babel-loader",   
                exclude:/node_modules/      
            },
            {
                test:/\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit:10000
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'vue-cli-webpack',
            template: 'index.html'
        })
    ],
    devServer:{
        contentBase:"./dist"
    },
}
```

现在就可以愉快的执行下面的指令：

```bash
npm run dev
npm run build
```



### vue-loader

在vue的开发过程中，通常我们需要写.vue结尾的文件即组件，如app.vue。需要通过vue-loader来进行加载，现在我们需要做如下配置。通过 vue-loader 和vue-template-compiler来加载并编译.vue文件。

```bash
npm install --save-dev vue-loader vue-template-compiler
```

Vue Loader 的配置和其它的 loader 不太一样。除了通过一条规则将 `vue-loader` 应用到所有扩展名为 `.vue` 的文件上之外，**还要确保在webpack 配置中添加 Vue Loader 的插件**：

webpack.config.js 中 

```javascript
//loader
{
    test: /\.vue$/,
    loader: 'vue-loader'
 }

//resolve
//自动解析确定的扩展。
extensions: ['.js','.vue'],

//plugins
 new VueLoaderPlugin()；
```

新建app.vue：

```vue
<template>
    <div>
        <p id="p-text">{{msg}}</p><img style="display: block;width: 100%" :src="img">
    </div>
</template>
<script>
    import img from '../img/night.png'
    export default {
        name: "app",
        data:function () {
            return{
                msg:'hello vue',
                img:img,
            }
        },
        created(){
            console.log(this.msg);
        },
    }
</script>
<style scoped>
</style>
```

修改main.js：

```javascript
import Vue from 'vue';
import './styles/main.css'
import App from './component/app'
new Vue({
    el:'#app',
    template: '<App/>',
    components: { App }
})
```

重新执行`npm run dev`，即可查看效果。

### 结束

到这里就差不多结束了。接下来就需要什么下什么，vue-router，vuex之类的。

还有推荐一个包分析工具：[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

### Reference

[webpack 搭建 vue 项目](https://juejin.im/post/5a425cb4f265da43294e4f2e#comment)

[webpack](https://webpack.docschina.org/configuration/)





