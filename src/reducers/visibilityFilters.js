import {VisibilityFilters} from '../actions/index'
const {show_all} = VisibilityFilters //解构语法是根据key来生成对应的变量  而不是根据顺序

//es6语法可以为参数设置初始默认值
const visibilityFilters = (state=show_all,action)=>{
  switch(action.type){
    case 'setVisibilityFilter':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilters