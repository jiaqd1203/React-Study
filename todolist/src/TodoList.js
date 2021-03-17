// {}包裹js表达式
// 运作原理首先render运行时渲染input显示this.state.inputValue对应的内容
// 当我输入内容的时候onChange就会执行，e.target.value负责看到我输入了什么内容
// inputValue: e.target.value把我输入的值变成inputValue
// 那么inputValue一改变，我输入的值也就显示出来了
// 在React中引入Component, Fragment
import React, { Component, Fragment } from 'react';
import './style.css'
// 把TodoItem引入进来这样我们就可以使用这个组件了
import TodoItem from './TodoItem';
// 把自己导出外部才能引用
class TodoList extends Component {
	//js里面一个类就有一个constructor构造函数，这个构造函数最先被执行
	constructor(props) {
		super(props);
		// 这个组件的状态
		this.state = {
			// input框里内容都存在这里,我们打上hello以后React可以感知到数据变化
			// 并且自动把数据映射到页面之上，这就是React的响应式特点
			// 但是这样会直接写死，导致我们无法输入别的了，因为input内容是由inputValue决定的
			inputValue: '',
			// 数组每一项
			list: []
		}
	}

	render() {
		return (
			//render语法要求内部所有内容必须包含在一个相同的大的元素当中，最外面这个div必须要有,
			// 但我们不想要，可以用Fragment来解决，这样就显示不出来最外层的div了
			<Fragment>
				<div>
					{/* html里label作用是扩大点击区域，我点击'输入内容'四个字光标自动移到input框
		for在React里也是造成歧义，我们要改成htmlFor,for 属性规定 label 与哪个表单元素绑定。
	   */}
					<label for="insertArea">输入内容</label>
					{/* 把input框对应的数据和状态（state）里的数据做一个绑定 
	  input里的值由this.state.inputValue这个状态决定
	  */}
					{/* 在React里class跟类名重合了，所以建议我们用className代替 */}
					<input
						id="insertArea"
						className='input'
						value={this.state.inputValue}
						//  事件绑定的时候需要bind(this)对函数的作用域进行变更
						//	监听input框变动，在React里C大写   
						//  bind() fn.bind(obj, args)方法的主要作用就是将函数绑定至某个对象，
						//  bind() 方法会创建一个函数，函数体内this对象的值会被绑定到传入bind() 
						//  函数的值当bind()的参数为空时，this指向全局对象比如windows
						//  有点像call和apply，可能就是修改this指向用的，参数是谁this就是谁
						//  我们需要让handleInputChange的this指向Todolist组件，但是它一开始并没有
						// 所以加上bind.(this)，括号里的this指向这个组件，我们用这方法改变this指向
						onChange={this.handleInputChange.bind(this)}
					/>
					{/* 在React里Click要大写 */}
					<button onClick={this.handleBtnClick.bind(this)}>提交</button></div>
				{/* 这样写死了，我们不这么写
			<li>学英语</li>
			<li>learning React</li>
			用map对list进行循环，回调函数接收俩参数，一个是具体的每项内容一个是每项下标
			 */}
				<ul>
					{/* 3.5.1此处原理是当我分别输入内容(比如1，2)在input框，上面list数组里会多出1，2两项
						这时候render进行页面渲染，第一次循环content{item}就是1，然后传给了子组件TodoItem
						这个子组件用this.props.content接收，然后显示的就是1，第二次传2，这样页面就显示我输入的内容了
						 */}
					{						
						this.state.list.map((item, index) => {
							return(								
							<div>
							{/*以下意思是我把list中的item内容通过content属性
							传给子组件，这样就把父组件内容传给了子组件，子组件(todoitem文件)就可以使用了
							父组件通过标签上的属性形式content={item}向子组件传递内容，既可以传递数据也可以传递方法
							子组件通过this.props.content来接收*/}
							{/*3.5.3关于子组件如何调用父组件方法来修改父组件内容
							父组件通过ItemDelete属性把自己的一个方法传给了子组件，子组件TodoItem
							就可以在handleClick里用props调用父组件传过来的ItemDelete这个方法 
							顺带着把index传过去 
							 */}
							<TodoItem 
								content={item} 
								index={index}
								// 3.5.4自己随便起的方法名,这个地方加bind是因为，当子组件接收ItemDelete的时候
								// 它相当于接收了handleItemDelete这个方法，然而子组件并没有这个方法，这个是父组件的方法
								// 所以就会报错，我们要让他指向绑定给父组件								
								ItemDelete={this.handleItemDelete.bind(this)}	
								/>
							{/* <li
							// key值？？
								key={index}
								onClick={this.handleItemDelete.bind(this, index)}
								// 我写<h1>a</h1>网页上也显示标签符号，我不想做转义
								// 那么可以写成以下方式，内层就是个js对象
								dangerouslySetInnerHTML={{ __html: item }}
							>
							</li> */}
							</div>
							)							
						})
					}
				</ul>
			</Fragment>
		)
	}
	//   创建方法，接收(e)event对象
	// target对应input框对应的dom节点,它返回<input value="Hello">这个
	handleInputChange(e) {
		//   需要改数据项内容不能直接改，要用setState函数改变
		this.setState({
			// 让input框数据变成e.target.value  
			inputValue: e.target.value
		})
	}
	handleBtnClick() {
		this.setState({
			// ...展开运算符(把以前数组内容全部展开生成一个新的数组)
			// 我要把list变成之前的list再加上this.state.inputValue
			list: [...this.state.list, this.state.inputValue],
			// 点击提交后清除input里的内容
			inputValue: ''
		})
	}
	handleItemDelete(index) {
		// 把state下面的list数组做一个拷贝然后放到list变量中
		const list = [...this.state.list];
		// 删除下标是index的元素，删除一个元素
		list.splice(index, 1);
		this.setState({
			// 操作完改变list变成当前的list变量的内容
			// immutable,state不允许我们做任何改变，比如this.state.list.splice(index,1)就不行
			// 我们要把list复制到新变量里再做操作
			list: list
		})
	}
}

export default TodoList;