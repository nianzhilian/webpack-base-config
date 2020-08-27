/**
 * 容器组件的目的是为了让展示组件和 redux store进行连接的一个过程
  */

 import React, {Component} from 'react'
 import { connect } from 'react-redux'
 import {addTodo} from '../actions'

 const AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
