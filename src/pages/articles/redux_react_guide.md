---
title: "【译】Redux 入门引导：理论概述与示例演练"
date: "2023-06-25"
---

# 前言

## 译者述

1、原文来自 [Tania Rascia](https://www.taniarascia.com/) 个人网站上的一篇文章：[Redux Tutorial: An Overview and Walkthrough](https://www.taniarascia.com/redux-react-guide/)。

2、这是一篇较易的入门介绍文章, 发布于 2020 年 3 月 9 日。

3、翻译中会尽量遵照原意, 也会加入译者的技术注释, 以及选择更符合汉语文法的译句。

---

## 作者述

你有使用 [React](https://reactjs.org/) 的经验吗?你是否听说过 Redux, 但是因为它看起来很复杂且没有合适的入门指南而推迟学习？如果这是你的情况, 那么这篇文章正适合你。放下恐惧, 和我一起开始这段不算痛苦的学习旅程吧。

## 预备知识

对本文教程, 你必须已知如何使用 React, 我不会解释任何 React 方面的知识。

- 熟悉 [HTML 和 CSS](https://internetingishard.com/)
- 熟悉 [ES6 语法和特性](https://www.taniarascia.com/es6-syntax-and-feature-overview/)
- 了解 React 术语：[JSX, State(状态), Components(组件), Props, Lifecycle(生命周期)](https://www.taniarascia.com/getting-started-with-react/) 以及 [Hooks](https://www.taniarascia.com/crud-app-in-react-with-hooks)
- 了解 [React Router](https://www.taniarascia.com/using-react-router-spa/)
- 了解异步 JS 和[创建 API 调用](https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript)

另外, 可以下载 Redux 开发工具：[谷歌浏览器插件](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)或者[火狐浏览器插件](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)。

## 本文目标

在本文中, 我们会新建一个小的 blog app, 它会从一个 API 中获取文章和评论。我曾经通过普通版本的 Redux 和[Redux Toolkit](https://redux-toolkit.js.org/) (RTK, 官方认可的 Redux 工具集) 创建过一个相同的 app。以下是普通版和 RTK 版的源代码和演示的链接。

**React + Redux Application (Plain Redux)**

- [源代码](https://codesandbox.io/s/react-redux-application-hewdb)
- [Demo 链接](https://hewdb.csb.app/)

**React + Redux Toolkit Application**

- [源代码](https://codesandbox.io/s/react-redux-toolkit-application-cbb6s)
- [Demo 链接](https://cbb6s.csb.app/)

> 注意: 此 app 是通过 “[JSON 占位符 API](https://jsonplaceholder.typicode.com/)” 从真正的 API 中获取数据的的。由于 CodeSandbox 上的速率限制, API 可能会显得很慢, 但这与 Redux app 本身无关。当然, 还可以直接在本地克隆数据。

我们将学到：

- 什么是 Redux 以及为什么使用它

- Redux 的术语：actions, reducers, store, dispatch, connect, 和 container

- 用[Redux Thunk](https://github.com/reduxjs/redux-thunk)发起异步 API 请求

- 学会使用 React 和 Redux 制作轻巧、真实的 app

- 学会使用 Redux 工具简化 Redux app 的开发

# 什么是 Redux

Redux 是一个 JS app 的状态管理器。使用 React, 可以在组件级别管理状态, 并通过 props 传递状态。而使用 Redux, 整个 app 的状态都会在一个不可变对象中管理。对 Redux 状态的每次更新, 其结果是一个新的对象, 它复制了原对象中的部分状态, 并添加了改动状态。

Redux 的初创人是 [Dan Abramov](https://overreacted.io/) 和 [Andrew Clark](https://github.com/acdlite)。

# 为什么使用 Redux

- 便于管理全局状态————访问或更新任何 Redux 连接组件的状态的任意部分。

- 便于追踪状态更改(通过 Redux 开发工具)————任何 action 或状态改变都可以被轻松追踪。实际上，每次更改，app 的全部状态都会被记录，这意味着我们可以轻松的进行 time-travel debugging, 以便于在更改历史之间切换。

Redux 的缺点在于它有很多初始样板(initial boilerplate)需要设置和维护(特别是单纯使用 Redux 而没有使用 Redux 工具的时候)。因此，对一个简单的 app 而言，或许[不需要使用 Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367), 而只需要简单使用 [Context API](https://www.taniarascia.com/using-context-api-in-react/) 即可管理好全局状态。

根据我的个人经验，之前是只使用 Context 建立 app, 后来将所有内容转换为 Redux 以便于维护和组织。

> (译者补充：这个状态追踪很像 git 的历史记录)

# 术语

我通常不喜欢单列出术语及其定义列表，但是 Redux 中有些概念就是很陌生的。所以我将在这部分描述定义，便于在后文中使用。虽然读者也可以跳过这部分内容，但我认为最好先阅读所有的定义，以便了解它们并在脑海中形成一个概念。

- Actions
- Reducers
- Store
- Dispatch
- Connect

我将使用经典的 todo app (待办事项) 来举例说明。

> (译者补充：这几个术语单词就不翻译了，读写时都是用英文的。)

## Actions

一个 action 从 app 将数据发送到 Redux store。一个 action 通常是一个对象，它有两个属性：type 和 payload(可选)。type 通常是一个大写的字符串，描述了 action (动作/事件)。payload 是可能被传输的附加数据。

```js
// Action Type
const DELETE_TODO = "posts/deleteTodo"
```

```js
// Action
{
  type: DELETE_TODO,
  payload: id,
}
```

## Action creators

一个 action creator 是一个函数，他返回一个 action 。

## Reducers

一个 reducer 是一个函数，有两个入参：state 和 action 。

一个 reducer 是不可变的，它的返回值是整个 state 的复制版本。

一个 reducer 通常由一个 switch 语句组成，该语句遍历所有可能的 action type 。

```js
// Reducer
const initialState = {
  todos: [
    { id: 1, text: "Eat" },
    { id: 2, text: "Sleep" },
  ],
  loading: false,
  hasErrors: false,
}

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      }
    default:
      return state
  }
}
```

> (译者补充：通过不同类型的 action 类型及其参数，就能触发某种功能的运行。于是，action 才是第一因变量（触发的源头），而状态量变成了功能运行过程中的一部分。相比于零散的状态更新，逻辑更集中，看起来就像功能入口变得更小了。)

## Store

Redux app 的 state 是存在于 store 中的，而 store 是由 reducer 初始化得到的。当和 React 一起使用时，用 Provider 标签包裹 app, 然后在 Provider 内部的任何东西就都可以访问 Redux 了。

```js
// Store
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./reducers"

const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
```

## Dispatch

dispatch 是一个函数，在 store 对象中。dispatch 接受一个对象参数：该对象用于更新 Redux state 。通常，此对象是调用 action creator 得到的结果。

```js
const Component = ({ dispatch }) => {
  useEffect(() => {
    dispatch(deleteTodo())
  }, [dispatch])
}
```

## Connect

connect 是一个函数，它是连接 React 到 Redux 的一种典经方法，连接的组件有时被称为容器。

好了，这差不多涵盖了 Redux 的主要项。在没有任何上下文的情况下阅读术语可能会让人不知所措，所以让我们开始吧。

# 快速开始

为了简单，我们使用 create-react-app 来设置环境。

```bash
npx create-react-app redux-tutorial
cd redux-tutorial
```

Redux 需要一些依赖：

- [Redux](https://github.com/reduxjs/redux) ———— 核心库
- [React Redux](https://github.com/reduxjs/react-redux) ———— 绑定 React 和 Redux
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) ———— Redux 异步中间件
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension) ———— 连接 Redux app 和 Redux DevTools

你可以使用 yarn add 或者 npm i 安装依赖这些，我自己也会使用 react-router-dom 这个额外的依赖。

> (译者补充：在不同 OS 中，读者注意下命令的变化)

```bash
npm i \
redux \
react-redux \
redux-thunk \
redux-devtools-extension \
react-router-dom
```

下一步，删除所有样板文件。我们将从头开始添加我们需要的所有东西。

```bash
cd src && rm * # 进入 src 文件，然后删除里面的所有文件
```

下一步，创建四个目录: Redux 中的 reducers 和 actions，还有 React 中的页面目录 pages 和组件目录 components 。

```bash
mkdir actions components pages reducers
```

下一步，把 index.js, App.js 和 index.css 重建回来。

```bash
touch index.js index.css App.js
```

现在我们的工程目录树如下所示：

```
└── src/
    ├── actions/
    ├── components/
    ├── pages/
    ├── reducers/
    ├── App.js
    ├── index.css
    └── index.js
```

对于 index.css 文件，只需复制[这个网站](https://gist.githubusercontent.com/taniarascia/b0ca2e2c165390f8678e1346514e143d/raw/bed873301fd1c71261a05ec02ca152d908f49463/index.css)的内容。我只打算讨论功能而不是样式，所以我只写了一些非常基本的样式，以确保网站看起来不太糟糕。

现在我们有了足够的样板文件，让我们开始吧。

# 设置 Redux Store

当我第一次学习 Redux 时，感到非常茫然，因为我看到的每个 app 的 index.js 设置都有点不同。在观察了很多最新的 app 并对它们的共性进行分析之后，我能够很好地识别 Redux app 中真正需要包含的内容，以及人们为了与众不同而别出心裁的操作。

网上有很多教程展示了“如何使用 todo 设置一个非常基本的 Redux 存储”，但我认为这些教程对于了解“如何进行生产级设置”没有多大帮助，所以我将从一开始就使用完整项（你需要的所有东西）来设置它。尽管 Redux 非常灵活多变，但还是会有一些固定不变化的方面。

在 index.js 中，我们会引入一些东西：

- **createStore**：创建 store 以维护 Redux 状态
- **applyMiddleware**：能够使用中间件，这里中间件指 thunk
- **Provider**：将整个应用程序封装在 Redux 中
- **thunk**：一个中间件，允许我们在 Redux 中进行异步操作
- **composeWithDevTools**：将应用程序连接到 Redux DevTools 的代码

```js
// index.js
import React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import App from "./App"
import rootReducer from "./reducers"

import "./index.css"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
```

> (译者补充：在 index.js 中的 Provider 写法，和 React 中提供的 useContext 用法相似)

在 App.js 中添加一个组件。我们稍后会修改它，但我们现在只想让应用程序启动并运行。

```js
// App.js

import React from "react"

const App = () => {
  return <div>Hello, Redux</div>
}

export default App
```

## 引入折叠器(reducers)

最后一件事是引入折叠器。reducer 是一个决定 Redux 状态变化的函数。它是一个纯函数，返回更新后的状态的复制。

Redux 的一个简洁特性是，我们可以有许多 reducer，并使用 combineReducers 将它们组合成一个给 store 使用的根 reducer。这使我们能够轻松地组织代码，同时仍然将所有内容放在一个根状态树中。

由于这个应用程序会类似一个博客，所以它会有一个文章列表，我们把列表放在 postsReducer 中。有了这个 combineReducers 方法，我们就可以引入任何我们想要的东西 —— commentsReducer 、authReducer，等等。

在 reducers/index.js 中，创建一个文件来组合所有的 reducers。

```js
// reducers/index.js

import { combineReducers } from "redux"

import postsReducer from "./postsReducer"

const rootReducer = combineReducers({
  posts: postsReducer,
})

export default rootReducer
```

最后，我们将创建 postsReducer。我们可以建立一个初始状态。就像你对普通 React 组件的期望一样，我们将有一个 loading 和 hasErrors 状态，以及一个 posts 数组，所有的文章列表都将保存在这里。首先，我们将在 switch 中设置为无动作，而只有一个返回整个状态的默认 case 。

```js
// reducers/postsReducer.js

export const initialState = {
  posts: [],
  loading: false,
  hasErrors: false,
}

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
```

现在我们至少有了足够的配置，应用程序能够加载而不会崩溃了。

## Redux DevTools

加载完应用程序并设置好 Redux \<Provider\> 后，我们可以看一下 Redux DevTools。下载拓展后，它将成为开发人员工具(F12)中的一个 tab。单击 State，能观察到到目前为止应用程序的整个状态。

![eventLoop](/redux_react_guide/reduxDevtools.png)

这里内容比较少看不太明显，但当你获得了很多 reducers and actions 时， Redux DevTools 就会显得很神奇。它可以跟踪应用程序的所有更改，与普通 React 相比，它使调试变得轻而易举。

# Setting up Redux Actions

## Responding to actions

# Connecting Redux to React Components

# The End

# Redux Toolkit

## Advantages to Redux Toolkit

## Store

## Slices

## Selecting Redux state in a React component

# Conclusion

```

```
