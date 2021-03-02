import React, { Component, Fragment} from 'react';
// 把自己导出外部才能引用
class TodoList extends Component{
  // render语法要求内部所有内容必须包含在一个相同的大的元素当中，最外面这个div必须要有,
	// 但我们不想要，可以用Fragment来解决
  
  constructor(props){
		super(props);
		// 这个组件的状态
		this.state = {
			// input框里内容都存在这里,我们打上hello以后React可以感知到数据变化
			// 并且自动把数据映射到页面之上，这就是React的响应式特点
			// 但是这样会直接写死，导致我们无法输入别的了，因为input内容是由inputValue决定的
			inputValue:'Hello',
			list:[]
		}
	}

	render(){
    return(
			<Fragment>
      <div>
		  <input value={this.state.inputValue} 
		//	监听input框变动，在React里C大写   
		//  bind() fn.bind(obj, args)方法的主要作用就是将函数绑定至某个对象，bind() 方法会创建一个函数，
		//  函数体内this对象的值会被绑定到传入bind() 
		//  函数的值当bind()的参数为空时，this指向全局对象比如windows
		  onChange={this.handleInputChange.bind(this)}
		  />
		  <button>提交</button></div>
			<ul>
				<li>学英语</li>
				<li>learning React</li>
			</ul>
			</Fragment>
    )
  }
		//   创建方法，接收event对象
  		handleInputChange(e){
	  		this.setState({
				inputValue: e.target.value
			})
  		}
}

export default TodoList;