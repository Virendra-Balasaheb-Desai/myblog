import React from 'react'
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
    
    return loader?<h2>Loading...</h2>:{children}
}

export default Protected
