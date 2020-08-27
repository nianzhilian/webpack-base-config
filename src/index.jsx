// import "@babel/polyfill"
//设置编译es6、es7的api
import "core-js/stable"
import "regenerator-runtime/runtime"
import "core-js/features/array/flat-map"

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect, Prompt,BrowserRouter, HashRouter } from 'react-router-dom'
import loadable from '@loadable/component'
import ScrollTop from './components/ScrollTop'
import { createBrowserHistory,createHashHistory } from "history"
import testImg from './assets/images/123.png'
import './assets/css/index.css'
function Home(props){
    console.lo(props)
    return (
        <div>
            hello,world1
            <img src={testImg} />
        </div>
    )
}

function HelloRoute(props){
    
    let Component = props.component
    return (
        <Route
        {...props} 
        render={
            routerProps=>(
                <div>
                    <Component {...routerProps} />
                </div>
            )
        }>

        </Route>
    )
}
{/* <BrowserRouter>
        <Redirect to={'/home'}></Redirect>
        <Switch>
            <HelloRoute path="/home" component={Home}></HelloRoute>
        </Switch>
    </BrowserRouter> */}
ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Redirect to={'/home'}></Redirect>
        <Switch>
            <HelloRoute path="/home" component={Home}></HelloRoute>
        </Switch>
    </Router>
    
    ,document.getElementById('root'))