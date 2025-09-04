import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader } from './index'


const Protected = ({ children, authentication = true }) => {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        }
        else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }

        setLoader(false)
    }, [authentication, navigate, authStatus])

    if (loader) {
        return <Loader />
    }
    return <>
        {children}
    </>
}

export default Protected
