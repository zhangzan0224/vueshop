// 导入axios
import axios from 'axios'
// 导入nprogress
import nprogress from 'nprogress'
// 如果出现进度条没有显示：一定是你忘记了引入样式了
import 'nprogress/nprogress.css'
nprogress.inc(0.2)
nprogress.configure({ easing: 'ease', speed: 700, showSpinner: false })

// 创建axios的实例
const requests = axios.create({
  // 基础路径
  baseURL: '/api',
  // 请求不能超过5S
  timeout: 5000
})

// axios设置请求拦截器,设置响应头token
requests.interceptors.request.use(
  (config) => {
    nprogress.start()
    return config
  },
  (err) => {
    console.log(err)
  }
)
// axios设置响应拦截器
// 响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
  (res) => {
    // 进度条结束
    nprogress.done()
    // 相应成功做的事情
    return res.data
  },
  (err) => {
    console.log('服务器响应数据失败')
    return err
  }
)

// 最终需要对外暴露（不对外暴露外面模块没办法使用）
// 这里的代码是暴露一个axios实例
export default requests
