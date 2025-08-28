import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Protected = ({children , authentication=true}) => {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }

        setLoader(false)
    }, [authentication,navigate,authStatus])
    
    if(loader){
        return <h2>Loading....</h2>
    }
    return <div>
        {children}
    </div>
}

export default Protected
