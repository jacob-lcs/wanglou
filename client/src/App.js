import React from 'react';
import './App.css';

class App extends React.Component {

  genError = () => {
    const a = undefined;
    console.log(a.a);
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.genError}>点击这里1</button>
        <button name='name-2' id='id-2' className='class-2'>点击这里2</button>
        <button>点击这里3</button>
        <button>点击这里4</button>
        <a href='http://localhost:3001' target='_blank' rel="noreferrer">跳转测试</a>
      </div>
    )
  }
}

export default App;
