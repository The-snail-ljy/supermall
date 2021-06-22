import axios from 'axios'



//通过导出一个promise来处理请求
export function request(config){
    //return new Promise((resolve,reject) => {
        //创建axios实例
        const instance = axios.create({
            baseURL: 'http://123.207.32.32:8000/api/h8',
            timeout: 5000
        })
        instance.interceptors.request.use(config => {
            //console.log(config)
            return config
        },err => {
            console.log(err)
        }
        )
        instance.interceptors.response.use(res => {
            //console.log(res)
            return res.data 
        },err => {
            console.log(err)
        }
        )
        return instance(config)
        
}