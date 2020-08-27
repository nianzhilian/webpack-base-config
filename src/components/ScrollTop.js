/*
 * @Author: your name
 * @Date: 2020-08-14 16:17:00
 * @LastEditTime: 2020-08-14 17:13:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactRouterDom\src\components\ScrollTop.js
 */
import React,{useEffect} from 'react'
import { useLocation } from 'react-router-dom'
export default function ScrollTop(){
  const {pathname} = useLocation()
  console.log(useLocation())
  useEffect(() => {
    window.scrollTo(0,0)
  }, [pathname])
  return null
}

