// 如果使用JSX语法就一定要引入react
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
ReactDOM.render(
  <React.StrictMode>
   <TodoList />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

