//封装了一个防抖函数，减少性能损耗 
export function  debounce(func,delay){
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this,args)
            //console.log('refresh')
        },delay)
    }
}