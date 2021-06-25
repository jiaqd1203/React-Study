// 如果使用JSX语法就一定要引入react，比如下面我用了<TodoList />，这就是JSX语法，如果不引入react是无法编译的
// Render里面用的也是JSX语法
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
// index.js是入口文件，进入以后我们知道我们渲染的只是todolist这一个组件
// ReactDOM是一个第三方模块他有一个方法叫做render，这个方法可以帮助我们将一个组件挂载到某一个DOM节点上
// 比如下面就是把Todolist挂载到了public文件夹的index.html的ID=root的DOM节点下
// 目前来看，页面所有内容都在todolist这一个组件当中
ReactDOM.render(<TodoList />,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

