/**
 * 创建一个主reducer  调用子reducer 合并成一个单一的state对象
 */
import { combineReducers  } from 'redux'
import todos from './todos'
import visibilityFilters from './visibilityFilters'
// export default function (state = {}, action) {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilters: visibilityFilters(state.visibilityFilters, action)
//   }
// }

/**
 * 上面的写法还可以用下面的代替
 */
export default combineReducers({todos,visibilityFilters})