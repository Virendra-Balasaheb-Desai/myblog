import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../appwrite/config"
import { PostForm, Container } from '../components/index'

const EditPost = () => {
    const [post, setPost] = useState(null)
    const [loader, setLoader] = useState(true)
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            }).catch((e) => {
                console.log("Edit post component Error : ", e);
            }).finally(() => {
                setLoader(false)
            })
        }
        else {
            navigate("/")
        }
    }, [slug, navigate])

    if (loader) {
        return <h2 className='w-full py-8'>Loading...</h2>
    }
    else if (post) {
        return <div className='w-full py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    }
    else {
        return <h2 className='w-full py-8'>No Post</h2>
    }
}

export default EditPost
