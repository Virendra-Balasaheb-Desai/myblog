import React from 'react'
import authSerive from "../appwrite/auth"
import { useDispatch } from 'react-redux'
import {logout} from "../store/authSlicer"

const LogoutBtn = () => {

    const dispatch = useDispatch();
    const logoutHandler = () =>{
        authSerive.logout().then(()=>{
            dispatch(logout)
            console.log("Logout");
        }
        ).catch((e)=>{
            console.log("LogoutHandler Error",e);
        })
    }
  return (
    <button className='inline-block px-6 py-4 rounded-full duration-200 hover:bg-blue-100' onClick={(e)=>{logoutHandler()}}>
        Logout
    </button>
  )
}

export default LogoutBtn
