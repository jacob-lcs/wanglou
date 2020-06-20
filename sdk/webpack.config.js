const path = require('path')

module.exports = {
  // webpack4需要添加这个配置，development为开发环境，production为生产环境
  mode: 'development',
  entry: path.join(__dirname, '/src/index.js'), // 唯一入口文件
  output: {
    path: path.join(__dirname, '/lib'), // 打包后的文件存放的地方
    filename: 'index.js' // 打包后输出文件的文件名
  }
}
