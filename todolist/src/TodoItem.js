// import React from 'react';class TodoItem extends React.Component可以这么写
// 也可以用ES6语法对它进行结构赋值

import React,{Component} from 'react';

class TodoItem extends Component{
    constructor(props){
        super(props);
        // 这就相当于我们把本应该下面的<div onClick={this.handleClick。bind(this)}>
        // 放到了这里来做
        this.handleClick = this.handleClick.bind(this);
    }
    render(){
        // 3.5.2此时我希望点击list内容就删除掉这一项，给子组件绑定一个handleClick方法
        // 页面上每一项是通过list数组渲染出来的，子组件如何调用父组件方法来修改父组件内容？
        // 父组件传递过来的内容子组件都是通过props来接收的
        const {content} = this.props;
        return (
        // onClick={this.handleClick}如果这么写this对应的值会是undefined，我们可以用bind(this)
        // 但其实并不推荐，因为功能可以但是性能有损耗，我们这样写：加上一个constructor
        <div onClick={this.handleClick}>
        {/* {this.props.content} 可以等价替换给const {content} = this.props;
        {content}这两行*/}
        {content}
        </div>)
    }
    handleClick(){
        // 子组件被点击的时候调用父组件的deleteItem这个方法
        // 调用父组件传来的方法的时候要记住给父组件this指向做一次bind绑定
        // 同时把父组件传递过来的index以参数形式传给这个方法
        const {deleteItem,index} = this.props;
        deleteItem(index);
        // 同理这个this.props.deleteItem(this.props.index)也可以改成上面的形式
    }
}

// 创建组件之后通过export把组件导出出去
export default TodoItem;