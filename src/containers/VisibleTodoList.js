/**
 * 容器组件的目的是为了让展示组件和 redux store进行连接的一个过程
  */

 import React, {Component} from 'react'
 import { connect } from 'react-redux'
 import {addTodo,toggleTodo,VisibilityFilters} from '../actions'
 import TodoList from '../components/TodoList'
import { createSelector  } from 'reselect'


 /**
  * 将列表和store数据进行管理  通过props将相应的数据传递给组件
  */


/**
 * 直接返回一个对象也可以这样写
 */

  // const mapToProps = state=>{
  //   return {
  //     todos:state.todos
  //   }
  // }



  /**
   * 根据过滤条件显示列表
   */

  const visibilityFilters = (todos,filter)=>{
    switch(filter){
      case VisibilityFilters.show_all:
        return todos
      case VisibilityFilters.show_active:
        //过滤只返回completed：为true的列表
        return todos.filter(t=>t.completed)
      case VisibilityFilters.show_completed:
        //过滤只返回为completed为false的列表
        return todos.filter(t=>!t.completed)
      default:
          throw new Error('Unknown filter: ' + filter)
    }
  }

  const getTodos = (state,filter)=>state.todos
  const getFilters = (state,filter)=>filter

  //为了防止每次树更新都需要从新计算  树的结构大了 会出现性能问题 Reselect能够帮助你省去那些没必要的重新计算
  //位置在redux的计算衍生数据内容里面
  const makeSelector = createSelector(
    [getTodos,getFilters],(todos,filter)=>{
      switch(filter){
        case VisibilityFilters.show_all:
          return todos
        case VisibilityFilters.show_active:
          //过滤只返回completed：为true的列表
          return todos.filter(t=>t.completed)
        case VisibilityFilters.show_completed:
          //过滤只返回为completed为false的列表
          return todos.filter(t=>!t.completed)
        default:
            throw new Error('Unknown filter: ' + filter)
      }
    }
  )

  //直接返回一个对象
  // const mapToProps = state=>({
  //   todos:visibilityFilters(state.todos,state.visibilityFilters)
  // })

  /**
   * 这样写法有一个缺点 每次todos改变 都会从新渲染组件  可以用reselect来优化 （计算衍生数据）
   */

  //   const mapToProps = (state,ownProps)=>({
  //   todos:visibilityFilters(state.todos,ownProps.filter)
  // })

    const mapToProps = (state,ownProps)=>({
    todos:makeSelector(state,ownProps.filter)
  })

  /**
   * @param id
   * @rise 设计事件委托 点击列表项时  设置选中和不选中状态  通过 props将触发的action的回调传递给 要连接的组件
   * 返回一个函数 将这个函数作为props传递给TodoList组件
   */
  
   const mapToDispatch = dispatch=>({
     toggle_todo:id=>dispatch(toggleTodo(id))
   })

  export default connect(mapToProps,mapToDispatch)(TodoList)

