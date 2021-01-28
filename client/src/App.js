import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      detailData: {}
    }
  }

  genError = () => {
    const a = undefined;
    console.log(a.a);
  }

  getData = async () => {
    const res = await fetch('http://localhost:4000/api/watch/getLogList').then(r => {
      return r.json()
    });
    console.log(`🤖🤝👽 ~ file: App.js ~ line 13 ~ App ~ getData= ~ res`, res);
    this.setState({
      listData: res.data
    })
  }

  getDetail = async (id) => {
    const res = await fetch(`http://localhost:4000/api/watch/getLogDetail?id=${id}`).then(r => {
      return r.json()
    });
    this.setState({
      detailData: res.data
    })
    console.log(`🤖🤝👽 ~ file: App.js ~ line 33 ~ App ~ res ~ res`, this.state.detailData);
  }

  componentDidMount = () => {
    this.getData();
  }

  render() {
    const { listData, detailData } = this.state;
    return (
      <div className="App">
        <div className='button-container'>
          <button onClick={this.genError}>点击这里1</button>
          <button name='name-2' id='id-2' className='class-2'>点击这里2</button>
          <button>点击这里3</button>
          <button>点击这里4</button>
          <a href='http://localhost:3001' target='_blank' rel="noreferrer">跳转测试</a>
        </div>
        <div className='log-container'>
          <div className='list-view'>
            <div>
              {
                listData.map(item => <div
                    style={{height: 100, paddingTop: 30, border: '1px solid black', cursor: 'pointer'}}
                    onClick={() => {this.getDetail(item.id)}}
                    key={item.id}
                  >
                  <b>{item.type}</b><br/>
                  <b>{new Date(Number(item.time)).toLocaleString()}</b>
                </div>)
              }
            </div>
          </div>
          <div className='detail-view'>
            {
              JSON.parse(detailData.breadcrumbs || '[]').map(item => <div className='detail-item'>
                {item.type === 'click' ? '点击事件' : item.type}
                {item.type === 'click' && <p>{item.detail.outerHtml}</p>}
                {item.type === 'console' && <p>{item.detail.arguments[0]}</p>}
              </div>)
            }
            <p>
              <p style={{color: 'red'}}>{detailData.message}</p>
              {detailData.stacktrace}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
