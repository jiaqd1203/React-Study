// {}包裹js表达式
// 运作原理首先render运行时把input框里的内容渲染成this.state.inputValue对应的内容来显示
// 当我输入内容的时候onChange就会执行，e.target.value负责看到并获取我输入了什么内容
// inputValue: e.target.value把我输入的值变成inputValue
// 那么inputValue一改变，页面上input的value属性的值就会改变,那么我输入的值也就显示出来了
// 在React中引入Component, Fragment
// 因为Todolist是React组件，所以它必须引入Component这个基类来继承它才可以生成一个react组件
// 3.6代码优化
import React, { Component, Fragment } from 'react';
import './style.css';
// 把TodoItem组件引入进来这样我们就可以使用这个组件了，在JSX中组件开头必须大写开头
// 所以当看到大写开头的标签时，在JSX里一般就是个组件，小写字母开头就是html标签
import TodoItem from './TodoItem';
// 把自己导出外部才能引用，见最底下的export default TodoList;
// 我这个TodoList组件继承了React的Component组件
class TodoList extends Component {
	//js里面一个类就有一个constructor构造函数，这个构造函数最先被执行
	//constructor有一个固定的写法他会接收一个props的参数
	constructor(props) {
	//super指的是父类也就是Component那个类 
		super(props);
		// React定义数据我们需要定义在状态里面,下面这个就是组件的状态,state负责存储组件数据
		// 4.3当组件的state或者props发生改变的时候，render函数就会重新执行，
		// 当父组件的render函数被运行时，它的子组件的render都将被重新运行一次
		this.state = {
			// input框里内容都存在这里,我们打上hello以后React可以感知到数据变化
			// 并且自动把数据映射到页面之上，这就是React的响应式特点
			// 但是这样会直接写死，导致我们无法输入别的了，因为input内容是由inputValue决定的
			inputValue: '',
			// 数组来存储input框下面产生的列表中的每一项
			list: []
		}
	}

	render() {
		return (
			//render语法要求内部所有内容必须包含在一个相同的大的元素当中，最外面这个div必须要有,
			// 但我们不想要，可以用Fragment来解决，这样就显示不出来最外层的div了
			// JSX注释只在开发的时候有意义,不会展示在页面上,如果写单行注释需要跟两个花括号分行:{//}占3行
			<Fragment>
				<div>
					{/* html里label作用是扩大点击区域，对鼠标用户友好，我点击'输入内容'四个字光标自动移到input框
					for的属性就是相关联的input的id属性，这两个要一起设置互相绑定
		for在React里也是造成歧义，我们要改成htmlFor,for 属性规定 label 与哪个表单元素绑定。
	   */}
					<label htmlFor="insertArea">输入内容</label>
					{/* 把input框对应的数据和状态（state）里的数据做一个绑定 
	  input里的值由this.state.inputValue这个状态决定
	  */}
					{/* 在React里class跟类名重合了，所以建议我们用className代替 */}
					<input
						id="insertArea"
						className='input'
						value={this.state.inputValue}
						//  this.handleInputChange这个方法绑定的时候this是undefined,bind改变this指向
						//  事件绑定的时候需要bind(this)对函数的作用域进行变更
						//	监听input框变动，在React里onChange里的C需要大写   
						//  bind() fn.bind(obj, args)方法的主要作用就是将函数绑定至某个对象，
						//  bind() 方法会创建一个函数，函数体内this对象的值会被绑定到传入bind() 
						//  函数的值当bind()的参数为空时，this指向全局对象比如windows
						//  有点像call和apply，可能就是修改this指向用的，参数是谁this就是谁
						//  我们需要让handleInputChange的this指向Todolist组件，但是它一开始并没有
						// 所以加上bind.(this)，括号里的this指向这个组件，我们用这方法改变this指向
						// onChange监听事件，一旦输入框内容改变这个就执行
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
					{/* 3.5.1此处原理是当我分别输入内容(比如输入1和2)在input框，上面list数组里会多出1和2两项
						这时候render进行页面渲染，第一次循环content{item}就是1，然后传给了子组件TodoItem
						这个子组件用this.props.content接收，然后显示的就是1，同理第二次传2，这样页面就显示我输入的内容了
						父组件像子组件传递内容是通过属性传递，传递过去之后子组件通过this.props.content来接收
						key值是什么？ 
						 */}
					{						
						this.state.list.map((item, index) => {
							{/* 当我们用list循环返回一个内容的时候，这个内容必须要有一个最外层包裹元素，
							否则会报错，那我们在这里加一个div，此处这段注释也不能写在return和div之间，否则报错 */}
							return(								
							<div>
							{/*以下意思是我把list中的item内容通过content属性
							传给TodoItem子组件，这样就把父组件内容传给了子组件，子组件(todoitem文件)就可以使用了
							父组件通过标签上的属性形式content={item}向子组件传递内容，既可以传递数据也可以传递方法
							子组件通过this.props.什么东西来接收
							*/}
							{/*3.5.3关于子组件如何调用父组件方法来修改父组件数据内容
							父组件通过ItemDelete属性把自己的一个方法传给了子组件，子组件TodoItem
							就可以在handleClick里用this.props.什么什么来调用父组件传过来的ItemDelete这个方法 
							顺带着把index传过去，调用父组件方法的时候一定记住父组件传递过来的函数的this指向要做一次bind绑定
							子组件调用父组件方法并借助这个方法对父组件的数据进行改变，父组件list数据一旦被改变了
							 它数组里的内容少了，页面自动就会把相关的dom进行删除，React自动感知到变化然后自动帮我们删除
							 */}
							 {/* 因为todoitem就是li的内容，所以我们把li给替换成todoitem组件 */}
							<TodoItem 
								content={item} 
								index={index}
								// 3.5.4自己随便起的方法名,这个地方加bind是因为，当子组件接收ItemDelete的时候
								// 它相当于接收了handleItemDelete这个方法，然而子组件并没有这个方法，这个是父组件的方法
								// 所以就会报错，我们要让他指向绑定给父组件								
								// 通过这个属性把自己的一个方法传给了子组件
								deleteItem={this.handleItemDelete.bind(this)}	
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
	//   创建方法负责inputchange的内容，接收(e)event对象
	// target对应input框对应的dom节点,它返回<input value="Hello">这个
	handleInputChange(e) {
		//   需要改数据项内容不能直接改(不能this.state直接这样改)，要用setState函数改变
		this.setState({
			// 让input框数据变成e.target.value(这个打印的就是input框里的内容)，target属性是获取触发事件对象的目标 
			// e.target指向事件执行时鼠标所点击区域的那个元素
			inputValue: e.target.value
		})
	}
	// 当用户点击按钮的时候
	handleBtnClick() {
		this.setState({
			// ...展开运算符(把以前数组内容全部展开生成一个新的数组)
			// 我要把list变成之前的list再加上最新输入的value值：this.state.inputValue
			list: [...this.state.list, this.state.inputValue],
			// 点击提交后清除input里的内容
			inputValue: ''
		})
	}
	handleItemDelete(index) {
		// 把state下面的list数组做一个拷贝然后放到list变量中
		const list = [...this.state.list];
		// 接收一个index值，然后删除list里面对应的下标是index的元素，删除一个元素
		list.splice(index, 1);
		this.setState({
			// 操作完改变list变成当前的list变量的内容
			// React有个叫immutable的概念：state不允许我们做任何改变，比如this.state.list.splice(index,1)就不行
			// 我们要把list复制到新变量里再做操作
			list: list
		})
	}
}

export default TodoList;