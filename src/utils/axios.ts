import axios from "axios";
import { ElLoading } from 'element-plus'

const TIMEOUT = 30000; //超时时间

//多次请求只会正真发送一次  避免重复请求。但是项目中存在短时间内请求相同接口的情况，比如照片接口。所以暂时把这个功能给取消掉了
// let pending: any = [];
// let cancelToken = axios.CancelToken;
// let cancelPending = (config: any) => {
//     pending.forEach((item: any, index: any) => {
//         if (!!config) {
//             if (item.u == config.url) {
//                 item.f(); //取消请求
//                 pending.splice(index, 1); //移除当前请求记录
//             };
//         } else {
//             item.f(); //取消请求
//             pending.splice(index, 1); //移除当前请求记录
//         }
//     });
// };

//使用create方法创建axios实例
export const axiosRequest = axios.create({
  timeout: TIMEOUT, // 请求超时时间
});

// 添加请求拦截器
axiosRequest.interceptors.request.use(async (config) => {
  return config;
});
// 添加响应拦截器
axiosRequest.interceptors.response.use(
  res => {
    if (res.data) {
      return res.data;
    } else {
      res.data = [];
      return res.data;
    }
  },
  error => {
    msg(error);
    let arr: any = [];
    return arr;
  },
);

//失败提示 (暂时未使用)
const msg = (err: any) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert('发出的请求有错误');
        break;
      case 401:
        alert('用户没有权限');
        break;

      case 403:
        alert('用户得到授权，但是访问是被禁止的');
        break;

      case 404:
        alert('请求地址出错');
        break;

      case 406:
        alert('请求的格式不可得');
        break;
      case 410:
        alert('请求的格式不可得');
        break;

      case 500:
        alert('服务器内部错误');
        break;

      case 502:
        alert('网关错误');
        break;

      case 503:
        alert('服务不可用');
        break;

      case 504:
        alert('网关超时');
        break;

      case 505:
        alert('HTTP版本不受支持');
        break;
      default:
    }
  }
};
