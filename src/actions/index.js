//actions 是一个普通对象 并且必须有一个type的属性 
//actions是把数据传到store的有效载荷   是state数据的唯一来源  一般会通过dispatch 将actions传到store


//action创建函数是一个纯函数 返回一个action对象

//reducer只能描述有事情发生 不能描述state的更新 
//对state的更新是 通过action这个有效载荷将action传到store中  从而更新相对应的state的部分数据

let nextToDoId = 0

//添加todo action创建函数  创建函数的目的就是生成一个action   可以根据自身需求定义action的内容

/**
 * @param text
 * 作用添加单个的列表项
 */
//减少样板式代码的写法
export function makeActionCreator(type,...argNames){
  return function(...args){
    const action = {type}
    argNames.forEach((arg,index)=>{
      action[argNames[index]] = args[index]
    })
    return action
  }
}

export  const addTodo = text=>({
  type:'add_todo',
  text,
  id:nextToDoId++
})

/**
 * @param filter
 * 设置当前的过滤条件
 */
export const setVisibilityFilter = filter=>({
  type:'setVisibilityFilter',
  filter
})

/**
 * @param id
 * 选中的列表项这个操作
 */
export const toggleTodo=id=>({
  type:'toggle_todo',
  id
})
/**
 * 设置过滤条件选项字典
 */
export const VisibilityFilters = {
  show_all:'show_all',
  show_active:'show_active',
  show_completed:'show_completed'
}
