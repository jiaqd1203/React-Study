import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// 为了让方格记住他被点击，用Square组件的state（状态）存储当前值，并在单击方格时更改这个值
class Square extends React.Component {
  constructor(){
    super();
    this.state = {
      value:null,
    }
  }
  render() {    
    return (
      // 每点击按钮的时候改变状态值为X
      <button
        className="square"
        onClick={() => this.setState({value:'X'})}
      >
      {/* 获取组件的状态值也就是上面刚改变的X */}
        {this.state.value}
      </button>
    );
  }
  }
  class Board extends React.Component {
    constructor(props) {
      super(props);
      // 设置初始状态为9个空值数组，对应9个方格
      this.state = {
        squares: Array(9).fill(null),
      };
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      squares[i] = 'X';
      this.setState({squares: squares});
    }
    // 一个方法，读取squares数组
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
        />
      );
    }
    render() {
      const status = 'Next player: X';
      return (
        <div>
          <div className="status">{status}</div>
          {/* 一个大棋盘九个格子 */}
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  