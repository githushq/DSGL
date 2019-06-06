// 引入moment 
import moment from "moment"
// 创建一个对象
var mymoment ={}
mymoment.install = function(Vue){
    // 定义一个全局过滤器
    Vue.filter("myfilter",function(value,sptStr){
        // 使用过滤器的数据
        return moment(value).format(sptStr)
    })
}
export default mymoment