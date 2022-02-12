module.exports = {
  productionSourceMap: false, // 去掉map文件,要不map文件太大,有了map文件可以知道是哪个文件报错了
  // 关闭ESLINT校验工具
  lintOnSave: false,
  // 配置代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211'
      }
    }
  }
}
