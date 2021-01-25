import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { startWatching } from './utils';

// var fundebug = require("fundebug-javascript");
// fundebug.apikey = "09e84220c9341758b1e077f82d0d7f2f8760c712e855f430644cd5c8f83f815d";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount = () => {
    startWatching()
  }

  componentDidCatch(error, info) {
    // 将component中的报错发送到Fundebug
    console.log('**************', error, info);
    // window.fundebug.notifyError(error, {
    //   metaData: {
    //     info: info
    //   }
    // });
  }

  render() {
    if (this.state.hasError) {
      return 'null';
      // Note: 也可以在出错的component处展示出错信息，返回自定义的结果。
    }
    return this.props.children;
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
