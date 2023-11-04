---
title: "【文】Webpack 入门"
date: "2023-11-04"
---

# 前言

## 作者述

随着技术的发展，新的工具不断出现，老的工具依然不过时。说到底，设计思想并没有革命性的变化。而工具，够用就行了。

本文通过 Webpack 来聊聊打包上的一些事情，结合实例来看看 Webpack 的使用和优化，最后做到能够按需自定义配置。

在[官网](https://www.Webpackjs.com/)有完整的说明，强烈建议之后去看一下。

## 预备知识

- 前端基础知识
- 了解项目部署基本知识
- 了解 npm 使用

本文适合有一定使用经验的读者 —— 能够创建一个简单的 app, 完成简单的模块代码开发。

## 本文目标

提高整体理解，对“打包”这件事和“打包工具 Webpack” 的认识。

- 了解到 Webpack 的历史发展
- 使用基本配置完成打包
- 了解常用的配置项及其含义
- 常用的配置项

最主要的是，在实际项目中用到 Webpack 时，能够用更高的视角来看待问题。

# 历史发展

## 基本概念

先介绍下三个概念的区别：

- 打包

  - **打包**是一个动作，是指处理某些⽂件并将其输出为其他⽂件的过程。

- 模块打包工具(module bundler)

  - **模块打包工具** 帮助生成用于部署的 js 脚本和样式表，可以通过配置提高代码性能和浏览器兼容性。

- 任务执行工具(task runner)

  - **任务执行工具** 用来自动化处理常见的开发任务，例如，lint(代码检测)、build(构建)、test(测试)。

相比模块打包工具（例如：Webpack、Browserify、Brunch），任务执行工具（例如：Make、Grunt、Gulp ）则聚焦在偏重上层的问题上面。

## 打包过程与模块开发

这个过程，随着时间的发展，不断出现新的问题和解决方案。

### 手动处理

> 在浏览器中运⾏ JavaScript 有两种⽅法。第⼀种⽅式，引⽤⼀些脚本来存放每个功能；此解决⽅案很难扩展，因为加载太多脚本会导致⽹络瓶颈。第⼆种⽅式，使⽤⼀个包含所有项⽬代码的⼤型 .js ⽂件，但是这会导致作⽤域、⽂件⼤⼩、可读性和可维护性⽅⾯的问题。

那时候还是 var 定义变量，在项目逐渐复杂之后，一系列问题凸显出来。

### 作用域冲突

为了解决作用域冲突问题，用立即执行函数 (IIFE - Immediately invoked
function expressions) 来封装单个函数功能。

这个做法虽然不是很好看，但确实很有用。当然，现在基本不这么写了。

```js
// foo.js
;(param => {
  var onlyThisFun = 0
  console.log({ param })
  // other handle
  return "result"
})(param)
```

用 IIFE 的方法成功避免了作用域冲突，但是代码在 \<script \/\> 中的加载仍然复杂且冗余。

### 精简引入

CommonJS 问世并引⼊了 require require 机制，它允许你在当前⽂件中加载和使⽤某个模块。而 Node.js 实现了这一点。

几乎和现在的写法一致了 npm + Node.js + modules

```js
// bar.js
module.exports = () => {
  // ...
}
```

```js
const bar = require('./bar.js')

bar()

exports.foo = 'foo'

exports.fn = () => { ... }
```

可以只引入库中需要的函数，减少了非必要代码。

当然，这里有个关键的问题：CommonJS 在 Node.js 中被原生支持，而浏览器原生是不支持 CommonJS 的。

### ECMA 模块

来⾃ Web 项⽬的好消息是，模块正在成为 ECMAScript 标准的官⽅功能。浏览器正在逐步⽀持中。

```js
// NumCalc.js
const addCalc = (a, b) => a + b
const delCac = (a, b) => a - b
export { addCalc, delCac }
```

```js
// index.js
import { addCalc, delCac } from "NumCalc"
console.log(addCalc(1, 2))
console.log(delCac(1, 2))
```

这种写法就很现代化了。

但是，ECMAScript 规范只是规定了最基本的事情需要怎么做，这里还有很多值得优化的地方。

例如：

```js
// index.js
import { addCalc, delCac } from "NumCalc"
setTimeOut(() => {
  console.log(addCalc(1, 2)) // 1、提前很久引入很久以后才执行、甚至可能不执行的代码
}, 200000)
// console.log(delCac(1, 2)) // 2、引入不用的代码
// 3、图片等资源怎么处理
// 4、代码的浏览器兼容问题
// 5、import export 太多，眼睛疼，怎么提高开发效率
```

你可能会说我在吹毛求疵，眼睛疼关 Webpack 什么事？

我想说，Webpack 经过这么多年的发展，已经是很完善且稳定的打包工具了。它就是考虑到了各种情况 —— 虽然这样可能会让人觉得配置起来好麻烦。

如果开发者就用默认配置，当然也能完成开发工作，只是我觉得会有些许遗憾。

## Webpack 发展史

此时从 Webpack github 上看到，最新的 release 版本是 v5.89.0 ，Webpack-cli 的版本是 v5.1.4 。

本文不关注版本的差别（一般都用新版本就行了），只是了解一下最开始 Webpack 是怎么出现的就行了。

### 创作者

从 github 的 Webpack 上可以看到核心团队的信息。

![core team](/Webpack/coreTeam.PNG)

其中，第一位，Tobias Koppers 就是这个仓库创建者，也就是最早的创作者。

Tobias 是一个德国人，网络昵称叫 sokra 。

sokra 之前是 Java 开发者。在 Java 里面有个很出名的技术 GWT（Google Web Toolkit）。GWT 里面有个 feature 叫「code splitting」。

2012 年 2 月 24 号，sokra 给 modules-webmake（前端项目打包的库）提了一个 issue ，希望他们能实现这个 feature。但是 modules-webmake 的维护者一直没有实现这个功能。

2012 年 3 月 10 号，sokra 去 follow 了一份 modules-webmake 代码，在 github 上开了一个新的项目 Webpack 。

「code splitting」这个 feature 就是 Webpack 现在提供的主要功能，也是当代前端的基石。

Webpack 的设计思想并不是独创的，但在当时的前端，它是最先进的。

### 影响力扩大

2013 年，React 开源。

2014 OSCON 大会（OSCON 是动物书 O'Reilly 组织的），Instagram （React 开发的图片社交网站） 的前端团队分享了他们对前端页面加载性能优化，其中很重要的一件就是用到的 Webpack 的 featere「code splitting」。

当时引起了很大的轰动，之后大家纷纷使用 Webpack，并给 Webpack 贡献了无数的 plugins ，loader。

2014 年后 Webpack 发展非常迅猛，版本更新非常快。

至今，Webpack 仍是主流之一。

# 专业术语

# 应用实例

## 配置含义

## 修改配置

## 构建过程

## 更多配置

# 生产实践

# 总结

# 参考资料

1 [Webpack 官方文档](https://www.Webpackjs.com/guides/integrations/)
