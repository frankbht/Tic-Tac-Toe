import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const startBoard = Array.apply(null, Array(9)).map(String.prototype.valueOf, '  ');
const historyBoard = [];
historyBoard.push(startBoard);
class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      player: 'X',
      board: startBoard
    }
    this.reset = this.reset.bind(this)
    this.preStep = this.preStep.bind(this)
  }
  reset() {
    this.setState({
      player: 'X',
      board: startBoard
    })
  }

  checkWinner() {
    let player = (
      this._checkSame(0,1,2) ||
      this._checkSame(3,4,5) ||
      this._checkSame(6,7,8) ||
      this._checkSame(0,3,6) ||
      this._checkSame(1,4,7) ||
      this._checkSame(2,5,8) ||
      this._checkSame(0,4,8) ||
      this._checkSame(2,4,6)
    );
    return player;
  }

  _checkSame(a, b, c){
    const buff = this.state.board[a]==='  '? '' : this.state.board[a];
    //console.log(this.state.board[a],this.state.board[b],this.state.board[c])
    if(this.state.board[b]===buff && this.state.board[c]===buff) {console.log('yes');return buff;}
    else return false;
  }

  handleInputClick(index) {
    const newBoard = this.state.board.slice()
    newBoard[index] = this.state.player;
    const newPlayer = this.state.player === 'X'? 'O':'X';
    this.setState({
      player : newPlayer,
      board : newBoard
    });
    // async
    historyBoard.push(this.state.board)
  }

  preStep() {
    if(historyBoard.length===0) return;
    const newBoard = historyBoard.pop();
    //console.log(newBoard)
    const newPlayer = this.state.player === 'X'? 'O':'X';
    this.setState({
      board : newBoard,
      player : newPlayer
    })
  }

  render() {
    const winner = this.checkWinner();
    //console.log(this.state)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Tic-Tac-Toe
        </p>
        <div>
          {winner? `The winner is ${winner}` : `Player ${this.state.player} turn!`}
          {winner? <button onClick={this.reset}>Reset</button> : ''}
          <button onClick={this.preStep}>Cheat</button>
          <br />
          <div>
            <input type="button" value={this.state.board[0]} onClick={(this.state.board[0]!=='  ' || winner)? ()=>{} : ()=>this.handleInputClick(0)}/>
            <input type="button" value={this.state.board[1]} onClick={(this.state.board[1]!=='  ' || winner)? ()=>{} : ()=>this.handleInputClick(1)}/>
            <input type="button" value={this.state.board[2]} onClick={(this.state.board[2]!=='  ' || winner)? ()=>{} : ()=>this.handleInputClick(2)}/>
          </div>
          <div>
            <input type="button" value={this.state.board[3]} onClick={(this.state.board[3]!=='  ' || winner)? ()=>{} : ()=>this.handleInputClick(3)}/>
            <input type="button" value={this.state.board[4]} onClick={(this.state.board[4]!=='  ' || winner)? ()=>{} : ()=>this.handleInputClick(4)}/>
            <input type="button" value={this.state.board[5]} onClick={(this.state.board[5]!=='  ' || winner)? ()=>{} : ()=>this.handleInputClick(5)}/>
          </div>
          <div>
            <input type="button" value={this.state.board[6]} onClick={(this.state.board[6]!=='  ' || winner)? ()=>{} : ()=>this.handleInputClick(6)}/>
            <input type="button" value={this.state.board[7]} onClick={(this.state.board[7]!=='  ' || winner)? ()=>{} : ()=>this.handleInputClick(7)}/>
            <input type="button" value={this.state.board[8]} onClick={(this.state.board[8]!=='  ' || winner)? ()=>{} : ()=>this.handleInputClick(8)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
