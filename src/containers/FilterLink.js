/**
 * 创建容器组件 filterLink 
 * 将展示组件Link 于store进行连接
 */
/**
 * 控制器的目的就是获取状态树的部分数据  并将数据通过props传递给展示组件
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import { setVisibilityFilter} from '../actions/index'
// import Link from '../components/Link'
import {NavLink} from 'react-router-dom'

// const mapActive = (state,owenr)=>({
//   active:state.visibilityFilters == owenr.filter
// })
// const mapAction = (dispatch,owenr)=>({
//   onClick:()=>dispatch(setVisibilityFilter(owenr.filter))
// })

// export default connect(
//   mapActive,
//   mapAction
// )(Link)

const FilterLink = ({filter,children})=>(
  <NavLink
  to={filter === 'show_all' ? '' : filter}
  activeStyle={{
    textDecoration: 'none',
    color: 'black'
  }}
  >
  {children}
  </NavLink>
);

export default FilterLink