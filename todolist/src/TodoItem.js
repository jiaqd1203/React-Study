// import React from 'react';class TodoItem extends React.Component可以这么写
// 也可以用ES6语法对它进行结构赋值

import React,{Component} from 'react';

class TodoItem extends Component{
    render(){
        return <div>{this.props.content}</div>
    }
}

// 创建组件之后通过export把组件导出出去
export default TodoItem;