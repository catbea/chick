import axios from 'axios';//引入axios
let axiosIns = axios.create({});

/*export function fetch(options){
    return new Promise((resolve, reject) => {
      const instance = axios.create({  //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
        //所有的请求都会带上这些配置，比如全局都要用的身份信息等。
        headers: {
          'Content-Type': 'application/json',
          // 'token_in_header': global_.token,//token从全局变量那里传过来
        },
        timeout:30 * 1000 // 30秒超时
      });
      instance(options)
        .then(response => { //then 请求成功之后进行什么操作

          resolve(response);//把请求到的数据发到引用请求的地方
        })
        .catch(error => {
          console.log('请求异常信息：'+error);
          reject(error);
        });
    });
}*/

function _fetch(config) {

    if (!config.url) {
        return console.warn('缺少请求地址url');
    }
    //var bodyStr = _objToParamUrl(config.data);
    var headers = config.header || {};
    headers['authorization'] ='';
    if(localStorage.getItem('userToken')){
        headers['authorization'] = localStorage.getItem('userToken')
    }
    /*if(config.isJson){
        headers['Content-Type']= 'application/json;charset=utf-8';
        //bodyStr = JSON.stringify(config.data)
    }else{
        headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    }*/
    var data = {
        method: config.type || 'POST',
        headers: headers,
        mode: "cors",
        //body:bodyStr
    }
    //判断config.data是否有值
    var flag = false;
    for (var key in config.data) {
        flag = true;
        break;
    }
    if (!flag&&(config.type+'').toUpperCase()!='POST') {
        delete data.body;
    }
    
    return new Promise((resolve, reject) => {
    	axiosIns(config.url, data)
    	.then(response => { //then 请求成功之后进行什么操作

          resolve(response);//把请求到的数据发到引用请求的地方
        })
        .catch(error => {
          console.log('请求异常信息：'+error);
          reject(error);
        });
    });
    
}

export default _fetch;