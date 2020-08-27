/**
 * @param state action
 * 创建子reducer 分别操作state树中的部分数据    最后通过主的reducers  调用子reducers
 * 将子reducers的返回数据合并成一个大的单一的state对象
 */
const todos =(state=[],action)=>{
  switch(action.type){
    case 'add_todo':
      return [
        ...state,
        {
          id:action.id,
          text:action.text,
          completed:false
        }
      ]
    case 'toggle_todo':
      //利用... 对象扩展符     添加对象扩展属性以使得更新不可变对象变得更加方便
      //还可以通过object.assign() 来实现
      // object.assign({},item,{completed:!item.completed})  最终是返回一个新的对象
      return state.map((item,index)=>{
        return (item.id == action.id)?{...item,completed:!item.completed}:item
      })
    default:
      return state
  }
}

export default todos